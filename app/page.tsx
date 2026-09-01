import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="landing">
        <div className="landingGlow" />
        <div className="landingCard">
          <span className="brandMark">G</span>
          <p className="eyebrow">MARKETING & REVENUE</p>
          <h1>Dashboard Pronto<span>.</span></h1>
          <p className="muted">Attribution Intelligence multi-tenant para Meta, Kommo/CRM e WhatsApp.</p>
          <div className="landingActions">
            <Link className="primary" href="/demo">Ver demonstração</Link>
            <span className="setupHint">Supabase Auth ainda não conectado a este usuário.</span>
          </div>
          <div className="tenantStrip">
            <div><strong>Cliente A</strong><span>Meta BM A · Kommo A</span></div>
            <div><strong>Cliente B</strong><span>Meta BM B · Kommo B</span></div>
          </div>
        </div>
      </main>
    );
  }

  const { data: memberships, error } = await supabase
    .from('organization_members')
    .select('organization_id, role, organizations(id, name, timezone, currency)')
    .eq('user_id', user.id);

  if (error || !memberships?.length) {
    return (
      <main className="landing">
        <div className="landingCard">
          <span className="brandMark">G</span>
          <p className="eyebrow">WORKSPACE</p>
          <h1>Nenhum cliente vinculado<span>.</span></h1>
          <p className="muted">Seu usuário está autenticado, mas ainda não possui acesso a uma organização.</p>
          <span className="setupHint">Peça a um owner/admin para adicionar seu usuário em organization_members.</span>
        </div>
      </main>
    );
  }

  redirect(`/app/${memberships[0].organization_id}`);
}
