import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function Home() {
  const mapRef = useRef(null);
  const [status, setStatus] = useState("Loading Google Maps...");

  useEffect(() => {
    const initMap = () => {
      if (window.google && mapRef.current) {
        setStatus("✅ Google Maps script loaded");

        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: -33.8688, lng: 151.2093 }, // Sydney fallback
          zoom: 12,
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const userLocation = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              };
              setStatus(`✅ User location: ${userLocation.lat}, ${userLocation.lng}`);
              map.setCenter(userLocation);
              new window.google.maps.Marker({
                position: userLocation,
                map,
                title: "You are here 🚀",
              });
            },
            () => setStatus("⚠️ User denied geolocation, showing Sydney")
          );
        }
      } else {
        setStatus("❌ Google Maps not available (check API key)");
      }
    };

    // If script already loaded
    if (window.google) {
      initMap();
    } else {
      window.initMap = initMap;
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>AR Billboard MVP</h1>
      <p>Status: {status}</p>
      <p><a href="/dashboard">Go to Dashboard</a></p>
      <p><a href="/ar/1">Launch AR Billboard</a></p>

      {/* Load Google Maps */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`}
        strategy="afterInteractive"
      />

      {/* Map container */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "500px",
          marginTop: "20px",
          border: "2px solid #ccc",
        }}
      />
    </div>
  );
}
