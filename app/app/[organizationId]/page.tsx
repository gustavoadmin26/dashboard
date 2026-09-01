import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function money(value: number, currency: string) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(value);
}

export default async function OrganizationDashboard({ params }: { params: Promise<{ organizationId: string }> }) {
  const { organizationId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/');

  const { data: membership } = await supabase
    .from('organization_members')
    .select('role, organizations(id, name, timezone, currency)')
    .eq('organization_id', organizationId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (!membership?.organizations) notFound();
  const org = Array.isArray(membership.organizations) ? membership.organizations[0] : membership.organizations;
  const currency = org.currency || 'BRL';

  const [{ data: insights }, { count: leads }, { count: attributed }] = await Promise.all([
    supabase.from('meta_insights_daily').select('spend').eq('organization_id', organizationId),
    supabase.from('kommo_leads').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId),
    supabase.from('lead_attribution').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId),
  ]);

  const spend = (insights || []).reduce((sum, row) => sum + Number(row.spend || 0), 0);
  const leadCount = leads || 0;
  const attributedCount = attributed || 0;

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brandMark">G</span><span>Dashboard Pronto</span></div>
        <div className="workspace"><small>CLIENTE ATIVO</small><strong>{org.name}</strong><span>{org.timezone || 'America/Sao_Paulo'} · {currency}</span></div>
        <nav>
          <Link className="active" href={`/app/${organizationId}`}>◈ <span>Visão geral</span></Link>
          <Link href={`/app/${organizationId}/attribution`}>◎ <span>Atribuição</span></Link>
          <Link href={`/app/${organizationId}/campaigns`}>▥ <span>Campanhas</span></Link>
          <Link href={`/app/${organizationId}/leads`}>◌ <span>Leads</span></Link>
          <Link href={`/app/${organizationId}/integrations`}>⌘ <span>Integrações</span></Link>
        </nav>
        <div className="sideBottom"><span className="statusDot" /> RLS multi-tenant ativo</div>
      </aside>
      <section className="content">
        <header><div><p className="eyebrow">MARKETING & REVENUE</p><h1>{org.name}<span>.</span></h1><p className="muted">Visão isolada do cliente · Meta + Kommo/CRM + WhatsApp.</p></div><div className="headerActions"><Link className="ghost buttonLink" href={`/app/${organizationId}/integrations`}>Integrações</Link><button className="period">Dados reais <b>●</b></button></div></header>
        <section className="grid">
          <article className="card"><div className="cardTop"><p>Investimento Meta</p><span className="spark">↗</span></div><strong>{money(spend, currency)}</strong><div className="delta"><span>org-scoped</span><small>RLS</small></div></article>
          <article className="card"><div className="cardTop"><p>Leads Kommo</p><span className="spark">◎</span></div><strong>{leadCount}</strong><div className="delta"><span>CRM</span><small>cliente atual</small></div></article>
          <article className="card"><div className="cardTop"><p>Leads atribuídos</p><span className="spark">⌁</span></div><strong>{attributedCount}</strong><div className="delta"><span>determinístico</span><small>confidence tracking</small></div></article>
          <article className="card"><div className="cardTop"><p>Conexões</p><span className="spark">⌘</span></div><strong>3</strong><div className="delta"><span>Meta · Kommo · WA</span><small>por cliente</small></div></article>
        </section>
        <div className="columns">
          <article className="panel"><div className="panelHead"><div><p className="kicker">ARQUITETURA</p><h2>Tenant isolation</h2><p className="muted">Cada consulta é limitada ao organization_id do cliente.</p></div><span className="tag"><span /> Seguro</span></div><div className="tenantFlow"><div><b>01</b><span>Cliente</span><strong>{org.name}</strong></div><div><b>02</b><span>Fontes</span><strong>Meta · Kommo · WhatsApp</strong></div><div><b>03</b><span>Atribuição</span><strong>Touches → lead_attribution</strong></div></div></article>
          <article className="panel"><div className="panelHead"><div><p className="kicker">ACESSO</p><h2>Seu papel</h2><p className="muted">Permissões por organização.</p></div></div><div className="roleCard"><span className="roleBadge">{membership.role}</span><p>O acesso deste usuário vale apenas para <strong>{org.name}</strong>.</p></div></article>
        </div>
        <article className="panel table"><div className="panelHead"><div><p className="kicker">PRÓXIMO PASSO</p><h2>Conecte as fontes deste cliente</h2><p className="muted">Os tokens ficam server-side; o dashboard recebe apenas status e dados consolidados.</p></div><Link className="viewAll" href={`/app/${organizationId}/integrations`}>Configurar →</Link></div><div className="sourceRows"><div><span className="sourceIcon">M</span><div><strong>Meta Ads</strong><small>BM + Ad Account deste cliente</small></div><em>pendente</em></div><div><span className="sourceIcon">K</span><div><strong>Kommo / CRM</strong><small>Leads, stages e responsáveis</small></div><em>pendente</em></div><div><span className="sourceIcon">W</span><div><strong>WhatsApp</strong><small>CTWA + click IDs + evidências</small></div><em>pendente</em></div></div></article>
        <footer><span>Dashboard Pronto · Attribution Intelligence</span><span>tenant <b>●</b> isolado</span></footer>
      </section>
    </main>
  );
}
