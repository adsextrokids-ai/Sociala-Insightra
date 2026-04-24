import { createClient } from '@supabase/supabase-js'

// Service role client — bypasses RLS.
// ONLY import this in API routes or Edge Functions. Never in Server Components or client files.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
