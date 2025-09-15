import { supabase } from '../../lib/supabase'

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const { spot_id, event, device } = req.body
  await supabase.from('logs').insert([{ spot_id, event, device }])
  res.status(200).json({ ok:true })
}
