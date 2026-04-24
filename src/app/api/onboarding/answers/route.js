import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('onboarding_answers')
    .select('step, answer')
    .eq('user_id', user.id)
    .order('step')

  if (error) return NextResponse.json({ answers: [] })
  return NextResponse.json({ answers: data || [] })
}
