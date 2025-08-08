import React, { useState } from 'react'
export default function Settings(){
  const [key, setKey] = useState(localStorage.getItem('tellawia.moralis')||'')
  const save = () => { localStorage.setItem('tellawia.moralis', key); alert('Saved! Reload to use the new API key.') }
  return (
    <div className="card p16">
      <h2>Settings</h2>
      <div className="row" style={{alignItems:'flex-start'}}>
        <div style={{flex:1}}>
          <label className="muted">Moralis API Key</label>
          <input className="input" value={key} onChange={e=>setKey(e.target.value)} placeholder="paste your Moralis API key"/>
          <p className="muted">Optional. If empty, ETH data will use demo; PulseChain currently uses demo.</p>
          <button className="btn" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}
