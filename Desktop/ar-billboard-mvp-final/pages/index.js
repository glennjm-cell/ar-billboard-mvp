import Head from "next/head"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Google will call this after the script loads
      window.initMap = () => {
        new google.maps.Map(document.getElementById("map"), {
          center: { lat: -33.865143, lng: 151.2099 }, // Sydney default
          zoom: 12,
        })
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>AR Billboard MVP</title>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=places`}
          async
          defer
        ></script>
      </Head>

      <main style={{ height: "100vh", width: "100%", margin: 0, padding: 0 }}>
        <h1 style={{ textAlign: "center" }}>🪧 AR Billboard Map</h1>
        <p style={{ textAlign: "center" }}>
          Visit <a href="/dashboard">Dashboard</a> to manage spots.
        </p>

        {/* Map container */}
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
