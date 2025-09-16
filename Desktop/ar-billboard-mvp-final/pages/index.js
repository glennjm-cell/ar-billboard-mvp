import { useEffect, useRef } from "react";

export default function Home() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google && mapRef.current) {
      // Initialize map centered on Sydney (fallback)
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -33.8688, lng: 151.2093 },
        zoom: 12,
      });

      // Try user geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userLocation = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            map.setCenter(userLocation);
            new window.google.maps.Marker({
              position: userLocation,
              map,
              title: "You are here 🚀",
            });
          },
          () => console.warn("User denied geolocation")
        );
      }
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>AR Billboard MVP</h1>
      <p>Manage spots here: <a href="/dashboard">Dashboard</a></p>
      <p>Try AR view: <a href="/ar/1">Launch AR</a></p>

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
