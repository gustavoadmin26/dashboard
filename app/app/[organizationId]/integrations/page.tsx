import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const providers = [
  { key: 'meta', label: 'Meta Ads', mark: 'M', description: 'Business Manager, Ad Accounts, campaigns, adsets, ads e insights.' },
  { key: 'kommo', label: 'Kommo / CRM', mark: 'K', description: 'Leads, pipeline, stages, responsáveis e eventos de mudança.' },
  { key: 'whatsapp', label: 'WhatsApp', mark: 'W', description: 'CTWA, click IDs, UTMs, wa_id hash e evidências de atribuição.' },
];

export default async function IntegrationsPage({ params }: { params: Promise<{ organizationId: string }> }) {
  const { organizationId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/');

  const { data: membership } = await supabase.from('organization_members').select('role, organizations(id, name)').eq('organization_id', organizationId).eq('user_id', user.id).maybeSingle();
  if (!membership?.organizations) notFound();
  const org = Array.isArray(membership.organizations) ? membership.organizations[0] : membership.organizations;
  const { data: connections } = await supabase.from('integration_connections').select('provider, status, external_account_id, expires_at, metadata, meta_business_manager_id, meta_ad_account_id').eq('organization_id', organizationId);
  const byProvider = new Map((connections || []).map((connection) => [connection.provider, connection]));
  const canManage = membership.role === 'owner' || membership.role === 'admin';

  return (
    <main className="shell"><aside className="sidebar"><div className="brand"><span className="brandMark">G</span><span>Dashboard Pronto</span></div><div className="workspace"><small>CLIENTE ATIVO</small><strong>{org.name}</strong><span>Configuração de fontes</span></div><nav><Link href={`/app/${organizationId}`}>◈ <span>Visão geral</span></Link><Link href={`/app/${organizationId}/attribution`}>◎ <span>Atribuição</span></Link><Link href={`/app/${organizationId}/campaigns`}>▥ <span>Campanhas</span></Link><Link href={`/app/${organizationId}/leads`}>◌ <span>Leads</span></Link><Link className="active" href={`/app/${organizationId}/integrations`}>⌘ <span>Integrações</span></Link></nav><div className="sideBottom"><span className="statusDot" /> RLS multi-tenant ativo</div></aside>
      <section className="content"><header><div><p className="eyebrow">WORKSPACE / INTEGRAÇÕES</p><h1>Fontes de dados<span>.</span></h1><p className="muted">Conexões independentes para {org.name}. Nenhum token é exposto ao browser.</p></div><div className="headerActions"><Link className="ghost buttonLink" href={`/app/${organizationId}`}>← Visão geral</Link></div></header>
        <div className="integrationGrid">{providers.map((provider) => { const connection = byProvider.get(provider.key); const status = connection?.status || 'not_connected'; return <article className="integrationCard" key={provider.key}><div className="integrationTop"><span className="sourceIcon large">{provider.mark}</span><span className={`integrationStatus ${status}`}>{status === 'active' ? 'conectado' : status === 'attention' ? 'atenção' : 'não conectado'}</span></div><h2>{provider.label}</h2><p>{provider.description}</p><div className="integrationMeta">{connection ? <><span>Conta: {connection.external_account_id || '—'}</span>{provider.key === 'meta' && <span>BM: {connection.meta_business_manager_id || '—'}</span>}</> : <span>Sem conexão cadastrada</span>}</div>{canManage ? <button className="connectButton">{connection ? 'Gerenciar conexão' : 'Conectar fonte'}</button> : <span className="setupHint">Somente owner/admin pode alterar integrações.</span>}</article>; })}</div>
        <article className="panel securityPanel"><div><p className="kicker">SEGURANÇA</p><h2>Isolamento por cliente</h2><p className="muted">integration_connections é filtrada por organization_id e protegida por RLS. A credencial deve ser armazenada cifrada e usada somente em jobs server-side.</p></div><span className="tag"><span /> RLS ativo</span></article>
      </section></main>
  );
}
