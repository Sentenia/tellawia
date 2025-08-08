import React, { useEffect, useMemo, useState } from 'react'
import Header from './Header.jsx'
import WalletsPanel from './WalletsPanel.jsx'
import Summary from './Summary.jsx'
import TxTable from './TxTable.jsx'
import Settings from './Settings.jsx'
import { fetchEthPortfolio, demoRows } from './data.js'

export default function App(){
  const [showAllChains, setShowAllChains] = useState(true)
  const [mainChain, setMainChain] = useState('pulse')
  const [tab, setTab] = useState('wallet') // wallet | taxes | settings
  const [wallets, setWallets] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tellawia.wallets')||'[]') } catch { return [] }
  })
  const [rows, setRows] = useState([])
  const [totals, setTotals] = useState({ portfolio: 0, estTax: 0 })

  useEffect(() => {
    localStorage.setItem('tellawia.wallets', JSON.stringify(wallets))
  }, [wallets])

  useEffect(() => {
    const apiKey = localStorage.getItem('tellawia.moralis') || ''
    const run = async () => {
      let allRows = []
      for(const w of wallets){
        if(w.chain === 'eth') {
          const r = await fetchEthPortfolio(w.address, apiKey)
          allRows = allRows.concat(r.rows)
        } else {
          // PulseChain live data pending; fallback demo
          allRows = allRows.concat(demoRows(w.address, 'pulse'))
        }
      }
      setRows(allRows)
      const portfolio = allRows.reduce((a,b)=>a+(b.usd||0),0)
      setTotals({ portfolio, estTax: Math.round(portfolio*0.05) })
    }
    run()
  }, [wallets, showAllChains, mainChain])

  return (
    <>
      <Header
        tab={tab} setTab={setTab}
        showAllChains={showAllChains} setShowAllChains={setShowAllChains}
        mainChain={mainChain} setMainChain={setMainChain}
      />
      <div className="wrap">
        {tab==='wallet' && (
          <>
            <WalletsPanel wallets={wallets} setWallets={setWallets} />
            <Summary totals={totals} />
            <TxTable rows={rows} />
          </>
        )}
        {tab==='taxes' && (
          <>
            <Summary totals={totals} />
            <TxTable rows={rows} />
            <p className="muted">U.S. tax logic preview. Edit/CSV export coming next.</p>
          </>
        )}
        {tab==='settings' && <Settings />}
      </div>
      <footer><div className="wrap" style={{padding:'0 16px'}}>Tellawia — <span className="muted">Powered by Sentria</span></div></footer>
    </>
  )
}
