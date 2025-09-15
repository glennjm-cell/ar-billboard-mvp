import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Spot(){
  const router = useRouter()
  const { id } = router.query
  const [spot, setSpot] = useState(null)

  useEffect(() => {
    if(id){
      fetchSpot()
      logEvent('scan')
    }
  }, [id])

  async function fetchSpot(){
    const { data } = await supabase.from('spots').select('*').eq('id', id).single()
    if(data) setSpot(data)
  }

  async function logEvent(event){
    await fetch('/api/log', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ spot_id:id, event, device: navigator.userAgent })
    })
  }

  if(!spot) return <p>Loading...</p>

  return (
    <div>
      <h1>{spot.name}</h1>
      <p>Point your camera at the AR marker to see the ad.</p>
      <img src="/marker.png" width="200"/>
      <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
      <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/3.3.2/aframe/build/aframe-ar.js"></script>
      <a-scene embedded arjs>
        <a-marker preset="hiro">
          <a-image src={spot.ad_url || '/demo-ad.jpg'} width="3" height="2"></a-image>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  )
}
