import { redirect } from 'next/navigation'

// Always start at step 1 — step page handles resuming via the Zustand store
export default function OnboardingIndexPage() {
  redirect('/onboarding/1')
}
