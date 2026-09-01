const metrics = [
  ["Investimento", "R$ 12.480", "+8,4%"],
  ["Leads", "384", "+14,2%"],
  ["Vendas", "47", "+11,9%"],
  ["Receita", "R$ 68.320", "+18,7%"],
];

export default function Home() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span>●</span> Dashboard Pronto</div>
        <nav><a className="active">Visão geral</a><a>Atribuição</a><a>Campanhas</a><a>Leads</a><a>Integrações</a></nav>
        <div className="sideBottom"><span className="dot" /> Sistema operacional</div>
      </aside>
      <section className="content">
        <header><div><p className="eyebrow">MARKETING & REVENUE</p><h1>Visão geral</h1><p className="muted">Acompanhe investimento, leads e receita em um só lugar.</p></div><button>Últimos 30 dias ▾</button></header>
        <div className="grid">{metrics.map(([label,value,delta]) => <article className="card" key={label}><p>{label}</p><strong>{value}</strong><span>{delta}</span></article>)}</div>
        <div className="columns"><article className="panel"><div className="panelHead"><div><h2>Receita por canal</h2><p className="muted">Atribuição determinística</p></div><span className="tag">Atualizado agora</span></div><div className="chart"><div style={{height:'72%'}} /><div style={{height:'48%'}} /><div style={{height:'61%'}} /><div style={{height:'83%'}} /><div style={{height:'56%'}} /><div style={{height:'92%'}} /><div style={{height:'68%'}} /><div style={{height:'78%'}} /></div><div className="legend"><span>Meta Ads</span><span>WhatsApp</span><span>Orgânico</span></div></article>
        <article className="panel"><div className="panelHead"><div><h2>Funil</h2><p className="muted">Leads por etapa</p></div></div><div className="funnel"><div><span>Leads</span><b>384</b></div><div><span>Qualificados</span><b>126</b></div><div><span>Propostas</span><b>71</b></div><div><span>Vendas</span><b>47</b></div></div></article></div>
        <article className="panel table"><div className="panelHead"><div><h2>Campanhas</h2><p className="muted">Performance consolidada</p></div></div><div className="row head"><span>Campanha</span><span>Investimento</span><span>Leads</span><span>Receita</span></div>{[["Black Friday — WhatsApp","R$ 4.820","142","R$ 28.600"],["Always On — Conversão","R$ 3.760","118","R$ 21.440"],["Remarketing — Site","R$ 2.180","74","R$ 11.280"],["Prospecting — Meta","R$ 1.720","50","R$ 6.980"]].map(r=><div className="row" key={r[0]}>{r.map((x,i)=><span key={i}>{x}</span>)}</div>)}</article>
      </section>
    </main>
  );
}
