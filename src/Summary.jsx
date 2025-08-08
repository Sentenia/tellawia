import React from 'react'
export default function Summary({ totals }){
  return (
    <div className="cards">
      <div className="card p16">
        <div className="muted">Total Portfolio Value</div>
        <div style={{fontSize:28,fontWeight:700}}>${(totals.portfolio||0).toLocaleString()}</div>
      </div>
      <div className="card p16">
        <div className="muted">Estimated Taxes (US)</div>
        <div style={{fontSize:28,fontWeight:700,color:'#ffb0df'}}>${(totals.estTax||0).toLocaleString()}</div>
      </div>
    </div>
  )
}
