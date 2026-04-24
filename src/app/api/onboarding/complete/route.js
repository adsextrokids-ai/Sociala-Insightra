import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { GOAL_TYPE_MAP } from '@/config/questions'

export async function POST() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Load all answers
  const { data: rows } = await supabase
    .from('onboarding_answers')
    .select('step, answer')
    .eq('user_id', user.id)

  const get = (step) => rows?.find(r => r.step === step)?.answer ?? null

  // Upsert business_profiles
  const profileData = {
    user_id:           user.id,
    business_name:     get(1),
    industry:          get(2),
    business_type:     get(3)?.toLowerCase().replace(' ', '_') ?? null,
    operating_since:   get(4),
    category:          get(5),
    differentiator:    get(6),
    trust_factors:     get(7),
    strengths:         get(8),
    brand_values:      get(9),
    posting_platforms: get(14),
    posting_frequency: get(15),
    content_types:     get(16),
    runs_ads:          get(17),
    target_audience:   get(18),
  }

  await supabase
    .from('business_profiles')
    .upsert(profileData, { onConflict: 'user_id' })

  // Insert goals (delete existing first to avoid duplicates)
  const goalsAnswer = get(10)
  if (Array.isArray(goalsAnswer) && goalsAnswer.length > 0) {
    await supabase.from('goals').delete().eq('user_id', user.id)
    const goalsRows = goalsAnswer
      .map(g => ({ user_id: user.id, goal_type: GOAL_TYPE_MAP[g] }))
      .filter(g => g.goal_type)
    if (goalsRows.length > 0) {
      await supabase.from('goals').insert(goalsRows)
    }
  }

  // Mark onboarding complete
  const { error } = await supabase
    .from('users')
    .update({ onboarding_completed: true, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
