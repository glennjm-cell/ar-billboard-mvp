import { useRouter } from "next/router"
import Head from "next/head"

export default function ARView() {
  const router = useRouter()
  const { id } = router.query

  // For demo, hardcode a sample ad spot.
  // Later we’ll fetch by `id` from Supabase.
  const spot = {
    title: "Coca-Cola Billboard",
    lat: -33.86785, // Example: Sydney coords
    lng: 151.20732,
    image: "/coca-cola-ad.png", // Put this image in /public folder
  }

  return (
    <>
      <Head>
        <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
        <script src="https://raw.githack.com/jeromeetienne/AR.js/3.3.2/aframe/build/aframe-ar.js"></script>
      </Head>

      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        arjs="sourceType: webcam; trackingMethod: best; debugUIEnabled: false;"
      >
        {/* Billboard image anchored to GPS coords */}
        <a-image
          src="/coca-cola-ad.png"
          gps-entity-place={`latitude: -33.86785; longitude: 151.20732;`}
          look-at="[gps-camera]"
        ></a-image>

        {/* User’s camera */}
        <a-camera gps-camera rotation-reader></a-camera>
      </a-scene>
    </>
  )
}
