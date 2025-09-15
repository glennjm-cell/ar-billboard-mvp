import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import dynamic from 'next/dynamic'
import QRCode from 'qrcode.react'

const Map = dynamic(() => import('../components/MapSpots'), { ssr: false })

export default function Dashboard(){
  const [spots, setSpots] = useState([])
  const [name, setName] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [adUrl, setAdUrl] = useState('')

  useEffect(() => { fetchSpots() }, [])

  async function fetchSpots(){
    const { data } = await supabase.from('spots').select('*').order('created_at', { ascending: false })
    if(data) setSpots(data)
  }

  async function addSpot(e){
    e.preventDefault()
    await supabase.from('spots').insert([{ name, lat, lng, ad_url: adUrl }])
    setName(''); setLat(''); setLng(''); setAdUrl('')
    fetchSpots()
  }

  return (
    <div style={{padding:'20px'}}>
      <h1>AR Billboard Dashboard</h1>
      <form onSubmit={addSpot}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Lat" value={lat} onChange={e=>setLat(e.target.value)} required />
        <input placeholder="Lng" value={lng} onChange={e=>setLng(e.target.value)} required />
        <input placeholder="Ad URL" value={adUrl} onChange={e=>setAdUrl(e.target.value)} required />
        <button type="submit">Add Spot</button>
      </form>

      <Map spots={spots} />

      <h2>Spots</h2>
      {spots.map(s => (
        <div key={s.id} style={{border:'1px solid #ccc',padding:'10px',margin:'10px 0'}}>
          <h3>{s.name}</h3>
          <p>{s.lat}, {s.lng}</p>
          <p><a href={`/spot/${s.id}`} target="_blank">View AR Billboard</a></p>
          <QRCode value={`/spot/${s.id}`} size={128}/>
        </div>
      ))}
    </div>
  )
}
