import Head from "next/head"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.initMap = () => {
        // Default fallback: Sydney
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: -33.865143, lng: 151.2099 },
          zoom: 12,
        })

        // Try to locate the user
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords
              const userLocation = { lat: latitude, lng: longitude }

              // Re-center map
              map.setCenter(userLocation)
              map.setZoom(14)

              // Drop a marker at user’s position
              new google.maps.Marker({
                position: userLocation,
                map,
                title: "You are here 🚀",
              })
            },
            (err) => {
              console.warn("Geolocation error:", err.message)
            }
          )
        }
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>AR Billboard MVP</title>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`}
          async
          defer
        ></script>
      </Head>

      <main style={{ height: "100vh", width: "100%", margin: 0, padding: 0 }}>
        <h1 style={{ textAlign: "center" }}>🪧 AR Billboard Map</h1>
        <p style={{ textAlign: "center" }}>
          Visit <a href="/dashboard">Dashboard</a> to manage spots.
        </p>

        <div
          id="map"
          style={{
            height: "80vh",
            width: "100%",
            border: "2px solid #ccc",
            marginTop: "20px",
          }}
        ></div>
      </main>
    </>
  )
}
