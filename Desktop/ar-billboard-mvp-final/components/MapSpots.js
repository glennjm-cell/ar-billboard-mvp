import { useEffect, useRef } from 'react'

export default function MapSpots({ spots }){
  const ref = useRef(null)
  useEffect(() => {
    if(typeof window !== 'undefined' && window.google){
      const map = new window.google.maps.Map(ref.current, {
        center: { lat: -33.8688, lng: 151.2093 },
        zoom: 12
      })
      spots.forEach(s => {
        new window.google.maps.Marker({
          position: { lat: parseFloat(s.lat), lng: parseFloat(s.lng) },
          map,
          title: s.name
        })
      })
    }
  }, [spots])
  return <div style={{width:'100%',height:'400px'}} ref={ref}></div>
}
