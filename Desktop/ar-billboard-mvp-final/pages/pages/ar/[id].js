import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";

export default function ARView() {
  const router = useRouter();
  const { id } = router.query;

  // Hardcoded demo ad spot
  const spot = {
    title: "Coca-Cola Billboard",
    lat: -33.86785, // Sydney
    lng: 151.20732,
    image: "/coca-cola-ad.png", // must exist in /public
  };

  return (
    <>
      <Head>
        <title>{spot.title} – AR View</title>
      </Head>

      {/* Load A-Frame and AR.js */}
      <Script src="https://aframe.io/releases/1.2.0/aframe.min.js" strategy="beforeInteractive" />
      <Script src="https://raw.githack.com/jeromeetienne/AR.js/3.3.2/aframe/build/aframe-ar.js" strategy="beforeInteractive" />

      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; trackingMethod: best; debugUIEnabled: false;"
        style={{ width: "100%", height: "100vh" }}
      >
        {/* Billboard image anchored to GPS coords */}
        <a-image
          src={spot.image}
          gps-entity-place={`latitude: ${spot.lat}; longitude: ${spot.lng};`}
          look-at="[gps-camera]"
        ></a-image>

        {/* User’s camera */}
        <a-camera gps-camera rotation-reader></a-camera>
      </a-scene>
    </>
  );
}
