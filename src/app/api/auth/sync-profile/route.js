import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Called after signUp / signIn to ensure public.users row exists.
// The DB trigger creates it automatically, but this is a failsafe.
export async function POST(request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { full_name } = await request.json().catch(() => ({}))

  // Check if row already exists
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single()

  if (existing) return NextResponse.json({ ok: true })

  // Row missing — create it (happens when trigger is not yet set up)
  const { error } = await supabase.from('users').insert({
    id:        user.id,
    email:     user.email,
    full_name: full_name || user.user_metadata?.full_name || null,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
