const metrics = [
  ["Investimento", "R$ 12.480", "+8,4%", "vs. período anterior"],
  ["Leads", "384", "+14,2%", "atribuídos"],
  ["Vendas", "47", "+11,9%", "fechadas"],
  ["Receita", "R$ 68.320", "+18,7%", "atribuída"],
];

const campaigns = [
  ["Black Friday — WhatsApp", "R$ 4.820", "142", "R$ 28.600", "A"],
  ["Always On — Conversão", "R$ 3.760", "118", "R$ 21.440", "A"],
  ["Remarketing — Site", "R$ 2.180", "74", "R$ 11.280", "B"],
  ["Prospecting — Meta", "R$ 1.720", "50", "R$ 6.980", "B"],
];

export default function Home() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brandMark">G</span><span>Dashboard Pronto</span></div>
        <div className="workspace"><small>WORKSPACE</small><strong>GDM Company</strong><span>Operação principal</span></div>
        <nav>
          <a className="active"><i>◈</i> Visão geral</a><a><i>◎</i> Atribuição</a><a><i>▥</i> Campanhas</a><a><i>◌</i> Leads</a><a><i>⌘</i> Integrações</a>
        </nav>
        <div className="sideBottom"><span className="statusDot" /> Sistema operacional</div>
      </aside>
      <section className="content">
        <header><div><p className="eyebrow">MARKETING & REVENUE</p><h1>Visão geral<span>.</span></h1><p className="muted">Performance da operação, atribuição e receita em um só lugar.</p></div><div className="headerActions"><button className="ghost">Exportar</button><button className="period">Últimos 30 dias <b>⌄</b></button></div></header>
        <section className="grid">{metrics.map(([label,value,delta,note]) => <article className="card" key={label}><div className="cardTop"><p>{label}</p><span className="spark">↗</span></div><strong>{value}</strong><div className="delta"><span>{delta}</span><small>{note}</small></div></article>)}</section>
        <div className="columns"><article className="panel"><div className="panelHead"><div><p className="kicker">RECEITA</p><h2>Receita por canal</h2><p className="muted">Atribuição determinística</p></div><span className="tag"><span /> Atualizado agora</span></div><div className="chart"><div className="gridline g1" /><div className="gridline g2" /><div className="bars"><div style={{height:'42%'}} /><div style={{height:'31%'}} /><div style={{height:'54%'}} /><div style={{height:'48%'}} /><div style={{height:'72%'}} /><div style={{height:'61%'}} /><div style={{height:'88%'}} /><div style={{height:'76%'}} /><div style={{height:'94%'}} /></div></div><div className="legend"><span><i className="legendBlue" /> Meta Ads</span><span><i className="legendLight" /> WhatsApp</span><span><i className="legendMuted" /> Orgânico</span></div></article>
        <article className="panel"><div className="panelHead"><div><p className="kicker">CONVERSÃO</p><h2>Funil de vendas</h2><p className="muted">Leads por etapa</p></div></div><div className="funnel"><div><span><b>01</b> Leads</span><strong>384</strong></div><div><span><b>02</b> Qualificados</span><strong>126</strong></div><div><span><b>03</b> Propostas</span><strong>71</strong></div><div><span><b>04</b> Vendas</span><strong>47</strong></div></div><div className="funnelRate"><span>Taxa de conversão</span><strong>12,2%</strong></div></article></div>
        <article className="panel table"><div className="panelHead"><div><p className="kicker">PERFORMANCE</p><h2>Campanhas</h2><p className="muted">Investimento e receita consolidados</p></div><a className="viewAll">Ver todas →</a></div><div className="row head"><span>Campanha</span><span>Investimento</span><span>Leads</span><span>Receita</span><span>Confiança</span></div>{campaigns.map(r=><div className="row" key={r[0]}><span className="campaignName">{r[0]}<small>Meta Ads · Conversão</small></span><span>{r[1]}</span><span>{r[2]}</span><span>{r[3]}</span><span><em className={'confidence c'+r[4]}>{r[4]}</em></span></div>)}</article>
        <footer><span>Dashboard Pronto · Attribution Intelligence</span><span>v0.1.0 · <b>●</b> conectado</span></footer>
      </section>
    </main>
  );
}
