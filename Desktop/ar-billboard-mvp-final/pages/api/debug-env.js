// pages/api/debug-env.js
export default function handler(req, res) {
  res.status(200).json({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Loaded" : "❌ Missing",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Loaded" : "❌ Missing",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅ Loaded" : "❌ Missing",
    NEXT_PUBLIC_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_NEXT_PUBLIC_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      ? "✅ Loaded"
      : process.env.NEXT_PUBLIC_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        ? "⚠️ Loaded (but missing NEXT_PUBLIC_ prefix)"
        : "❌ Missing"
  })
}
