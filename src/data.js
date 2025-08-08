export function demoRows(address, chain){
  const today = new Date().toISOString().slice(0,10)
  return [
    { date: today, type: 'Swap', asset: 'ETH → USDC', amount: '0.25', usd: 725, note: 'Demo data' },
    { date: today, type: 'Receive', asset: chain==='pulse'?'PLS':'ETH', amount: chain==='pulse'?'5000':'0.05', usd: 120, note: 'Demo data' },
  ]
}

export async function fetchEthPortfolio(address, apiKey){
  if(!apiKey){
    return { rows: demoRows(address, 'eth') }
  }
  const url = `https://deep-index.moralis.io/api/v2.2/wallets/${address}/history?chain=eth&limit=10`
  const res = await fetch(url, { headers: { 'X-API-Key': apiKey }})
  if(!res.ok){
    return { rows: demoRows(address, 'eth') }
  }
  const data = await res.json()
  // Map minimal fields to our rows
  const rows = (data?.result||[]).slice(0,10).map(tx => ({
    date: new Date(tx.block_timestamp || Date.now()).toISOString().slice(0,10),
    type: tx.value && tx.value !== '0' ? 'Transfer' : 'Tx',
    asset: 'ETH',
    amount: (Number(tx.value||0)/1e18).toFixed(6),
    usd: 0,
    note: tx.hash?.slice(0,10)+'…'
  }))
  return { rows }
}
