import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { step, section, question, answer } = await request.json()

  const { error } = await supabase
    .from('onboarding_answers')
    .upsert(
      { user_id: user.id, step, section, question, answer },
      { onConflict: 'user_id,step' }
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
