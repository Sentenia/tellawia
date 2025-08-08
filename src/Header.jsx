import React from 'react'
export default function Header({ tab, setTab, showAllChains, setShowAllChains, mainChain, setMainChain }){
  return (
    <header>
      <div className="hinner">
        <div className="brand">
          <div className="logo">🤖</div>
          <div>
            <div className="title">Tellawia</div>
            <div className="sub">Powered by Sentria</div>
          </div>
        </div>
        <div className="controls">
          <button className={'btn '+(showAllChains?'on':'')} onClick={()=>setShowAllChains(v=>!v)}>All Chains: {showAllChains?'On':'Off'}</button>
          <button className={'btn '+(mainChain==='pulse'?'on':'')} onClick={()=>setMainChain('pulse')}>PulseChain</button>
          <button className={'btn '+(mainChain==='eth'?'on':'')} onClick={()=>setMainChain('eth')}>Ethereum</button>
          <button className={'btn '+(tab==='wallet'?'on':'')} onClick={()=>setTab('wallet')}>Wallet</button>
          <button className={'btn '+(tab==='taxes'?'on':'')} onClick={()=>setTab('taxes')}>Taxes</button>
          <button className={'btn '+(tab==='settings'?'on':'')} onClick={()=>setTab('settings')}>Settings</button>
        </div>
      </div>
    </header>
  )
}
