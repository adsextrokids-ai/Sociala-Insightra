# ARCHITECTURE.md — Social AI Platform
> Source of truth for technical decisions. Updated before any code is written.

---

## Step 2 — Product Understanding Summary

**What it is:** An AI-powered social business intelligence SaaS. Business owners connect their social accounts, answer a guided questionnaire, and receive a structured AI analysis — strengths, weaknesses, opportunities, a growth roadmap, content suggestions, and scored metrics — presented in a premium dashboard.

**Who it's for:** Small business owners, personal brand builders, and creators who manage their own social presence but lack a marketing strategist. Non-technical users who want a high-signal, low-effort diagnosis of their online presence.

**Phase 1 MVP scope:**
1. Email + Google OAuth signup/login
2. Multi-step conversational business questionnaire (stored as AI memory)
3. Social account connection: Instagram, YouTube, Facebook
4. Automated profile scan triggered on connection
5. Claude-powered business intelligence report generation
6. Dashboard with scores, strengths/weaknesses, recommendations, and a 7/30/90-day roadmap

**Explicitly OUT of scope for Phase 1:**
- TikTok, LinkedIn, Pinterest integrations
- Billing / subscriptions / paywalls
- Team accounts or multi-user workspaces
- Prisma ORM
- White-label features
- Advanced analytics / trend history
- Email notifications or CRM integrations
- RAG / vector search / embeddings-based memory
- OpenAI as a live provider (Claude only in Phase 1 — see §5 below)

---

## 1. Tech Stack Confirmation

| Layer | Choice | Justification |
|---|---|---|
| Framework | Next.js 14 (App Router) | Server Components reduce client JS; App Router enables per-route layouts needed for onboarding vs dashboard |
| Styling | Tailwind CSS v3 | Utility-first, zero runtime, spec-aligned |
| Animation | Framer Motion | Conversational onboarding requires smooth card transitions; Framer is the standard choice |
| State | Zustand | Lightweight, no boilerplate; appropriate for onboarding wizard state and dashboard cache |
| Database | Supabase PostgreSQL | All backend infra in one place; RLS handles auth-layer data security |
| Auth | Supabase Auth | Email + Google OAuth built-in; session management via cookies; no extra service |
| Serverless | Supabase Edge Functions (Deno) | Long-running AI processing (>10s) that would hit Vercel's 10s free-tier timeout |
| Hosting | Vercel | Zero-config Next.js deploys; preview environments per PR |
| Language | JavaScript (not TypeScript) | Per spec; removes compile overhead for fast MVP iteration |
| AI | Claude API (Anthropic SDK) only | See challenge below |

### Challenges and Flags

**Flag 1 — Dual AI providers (Claude + OpenAI):**
The spec lists both Claude API and OpenAI API. Using both in Phase 1 doubles prompt maintenance, increases cost unpredictability, and adds zero user-visible value. **Decision: Claude only in Phase 1.** Add OpenAI as a configurable fallback in Phase 2 via a provider abstraction layer.

**Flag 2 — SF Pro Display font:**
SF Pro Display is Apple proprietary and cannot be legally embedded in a web product. **Decision: Use `system-ui` as the display font stack — it renders as SF Pro on macOS/iOS automatically, legally, and falls back to Segoe UI on Windows and Roboto on Android. No file embedding needed.**

**Flag 3 — Instagram OAuth complexity (critical):**
The Instagram Basic Display API was deprecated in December 2024. The only supported path for reading real Instagram data is the **Instagram Graph API via Facebook Login**, which requires: (a) user has a Business or Creator Instagram account, (b) that account is linked to a Facebook Page, (c) the app has passed Meta's App Review for `instagram_basic`, `pages_show_list` permissions. App Review can take 1–4 weeks and requires privacy policy, demo video, and terms of service.
**Decision: Connect Instagram last. Start with YouTube (Google OAuth — no review needed). Facebook Pages API works in development mode without review. Submit Meta app review on Day 1 of development so it's approved by the time social connect is built. Document the Business account requirement clearly in the UI.**

**Flag 4 — "Layouts" folder:**
The spec lists `src/layouts/` as a top-level folder. In Next.js App Router, layouts are `layout.js` files co-located inside `src/app/`. A separate `layouts/` folder is a Pages Router pattern. **Decision: Layouts live as `layout.js` files in `app/`. Reusable layout *components* (Sidebar, Header) live in `src/components/layout/`.**

---

## 2. Folder Structure

```
sociala-insightra/
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── (auth)/                       # Route group: public pages
│   │   │   ├── login/
│   │   │   │   └── page.js
│   │   │   ├── signup/
│   │   │   │   └── page.js
│   │   │   ├── auth/callback/
│   │   │   │   └── route.js             # Supabase auth exchange route
│   │   │   └── layout.js                # Centered card layout
│   │   ├── (app)/                        # Route group: protected pages
│   │   │   ├── onboarding/
│   │   │   │   ├── page.js              # Redirects to /onboarding/1
│   │   │   │   └── [step]/
│   │   │   │       └── page.js          # Dynamic step renderer
│   │   │   ├── dashboard/
│   │   │   │   ├── page.js              # Main overview
│   │   │   │   ├── insights/
│   │   │   │   │   └── page.js
│   │   │   │   ├── social/
│   │   │   │   │   └── page.js
│   │   │   │   └── roadmap/
│   │   │   │       └── page.js
│   │   │   ├── connect/
│   │   │   │   └── page.js              # Social account connection hub
│   │   │   └── layout.js                # App shell (sidebar + topbar)
│   │   ├── api/
│   │   │   ├── social/
│   │   │   │   ├── instagram/
│   │   │   │   │   ├── connect/route.js # Returns OAuth redirect URL
│   │   │   │   │   └── callback/route.js
│   │   │   │   ├── youtube/
│   │   │   │   │   ├── connect/route.js
│   │   │   │   │   └── callback/route.js
│   │   │   │   └── facebook/
│   │   │   │       ├── connect/route.js
│   │   │   │       └── callback/route.js
│   │   │   └── ai/
│   │   │       └── scan/route.js        # Invokes Edge Function; returns 202
│   │   ├── layout.js                    # Root layout: fonts, Zustand provider
│   │   ├── page.js                      # Root: redirect to /dashboard or /login
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                          # Primitive components
│   │   │   ├── Button.js
│   │   │   ├── Card.js
│   │   │   ├── Badge.js
│   │   │   ├── Input.js
│   │   │   ├── Progress.js
│   │   │   └── Spinner.js
│   │   ├── onboarding/
│   │   │   ├── QuestionCard.js          # Animated card per question
│   │   │   ├── ProgressBar.js
│   │   │   ├── AnswerInput.js           # Handles text, select, multi-select
│   │   │   └── StepTransition.js        # Framer Motion wrapper
│   │   ├── dashboard/
│   │   │   ├── ScoreRing.js             # Circular score visualisation
│   │   │   ├── InsightCard.js           # Strength/weakness/opportunity card
│   │   │   ├── SocialPlatformCard.js    # Per-platform metrics
│   │   │   ├── RoadmapTimeline.js       # 7/30/90-day roadmap
│   │   │   ├── RecommendationList.js
│   │   │   ├── ContentSuggestionCard.js
│   │   │   └── ScanningState.js         # Loading state while AI processes
│   │   ├── social/
│   │   │   ├── ConnectButton.js         # Per-platform connect CTA
│   │   │   └── AccountCard.js           # Connected account display
│   │   └── layout/
│   │       ├── Sidebar.js
│   │       ├── Topbar.js
│   │       └── PageWrapper.js
│   ├── hooks/
│   │   ├── useUser.js                   # Current user + session
│   │   ├── useOnboarding.js             # Step navigation, answer saving
│   │   ├── useDashboard.js              # Report data, polling
│   │   └── useSocialAccounts.js         # Connected accounts, connect flow
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.js                # Browser singleton (createBrowserClient)
│   │   │   ├── server.js                # Server Component client (createServerClient)
│   │   │   └── admin.js                 # Service role client — API routes only
│   │   ├── ai/
│   │   │   ├── claude.js                # Anthropic SDK wrapper with error handling
│   │   │   ├── context.js               # Assembles businessContext from DB records
│   │   │   └── prompts/
│   │   │       ├── analysis.js          # Master analysis prompt template
│   │   │       ├── roadmap.js           # Roadmap generation prompt
│   │   │       └── content.js           # Content suggestion prompt
│   │   └── social/
│   │       ├── instagram.js             # Graph API calls
│   │       ├── youtube.js               # YouTube Data API v3 calls
│   │       └── facebook.js              # Facebook Graph API calls
│   ├── store/
│   │   ├── onboardingStore.js           # Wizard step, answers, completion
│   │   ├── dashboardStore.js            # Report data, scores, UI state
│   │   └── userStore.js                 # User profile, session
│   ├── utils/
│   │   ├── formatters.js                # Score to label, date formatting
│   │   ├── validators.js                # Answer validation per question type
│   │   └── constants.js                 # Platform names, score thresholds
│   └── config/
│       ├── questions.js                 # Full questionnaire definition (see §5)
│       └── platforms.js                 # Social platform metadata
├── supabase/
│   ├── functions/
│   │   └── process-social-scan/
│   │       └── index.ts                 # Edge Function: fetch → analyse → store
│   └── migrations/
│       └── 0001_initial_schema.sql
├── middleware.js                        # Route protection
├── tailwind.config.js
├── next.config.js
└── .env.local
```

---

## 3. Supabase Schema

### Create Tables

```sql
-- ============================================================
-- TABLE 1: users
-- Extends auth.users; created automatically on signup via trigger
-- ============================================================
CREATE TABLE public.users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT UNIQUE NOT NULL,
  full_name     TEXT,
  avatar_url    TEXT,
  onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger: auto-insert on auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TABLE 2: business_profiles
-- One row per user; populated during onboarding
-- ============================================================
CREATE TABLE public.business_profiles (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  business_name       TEXT,
  industry            TEXT,
  business_type       TEXT CHECK (business_type IN ('products', 'services', 'both')),
  operating_since     TEXT,
  category            TEXT,
  differentiator      TEXT,
  trust_factors       TEXT,
  strengths           TEXT[],
  brand_values        TEXT[],
  posting_platforms   TEXT[],
  posting_frequency   TEXT,
  content_types       TEXT[],
  runs_ads            BOOLEAN,
  target_audience     TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id)
);

-- ============================================================
-- TABLE 3: onboarding_answers
-- Individual Q&A pairs; acts as AI memory source
-- ============================================================
CREATE TABLE public.onboarding_answers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  step        INTEGER NOT NULL,
  section     TEXT NOT NULL,  -- 'business_basics', 'identity', 'goals', 'challenges', 'content', 'expectations'
  question    TEXT NOT NULL,
  answer      JSONB NOT NULL, -- supports text, array, boolean answers uniformly
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE 4: social_accounts
-- Connected OAuth accounts; one row per user per platform
-- ============================================================
CREATE TABLE public.social_accounts (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  platform            TEXT NOT NULL CHECK (platform IN ('instagram', 'youtube', 'facebook')),
  platform_user_id    TEXT NOT NULL,
  username            TEXT,
  display_name        TEXT,
  access_token        TEXT NOT NULL,   -- stored encrypted via Supabase Vault or app-level AES
  refresh_token       TEXT,
  token_expires_at    TIMESTAMPTZ,
  profile_url         TEXT,
  avatar_url          TEXT,
  follower_count      INTEGER,
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  last_synced_at      TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, platform)
);

-- ============================================================
-- TABLE 5: social_analysis
-- Raw + scored data returned by platform APIs per scan
-- ============================================================
CREATE TABLE public.social_analysis (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  social_account_id       UUID NOT NULL REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  platform                TEXT NOT NULL,
  raw_data                JSONB,          -- full API response, stored for re-analysis
  profile_score           INTEGER CHECK (profile_score BETWEEN 0 AND 100),
  engagement_rate         NUMERIC(6,2),
  posting_frequency_score INTEGER CHECK (posting_frequency_score BETWEEN 0 AND 100),
  content_quality_score   INTEGER CHECK (content_quality_score BETWEEN 0 AND 100),
  branding_score          INTEGER CHECK (branding_score BETWEEN 0 AND 100),
  analysis_data           JSONB,          -- structured breakdown per platform
  scanned_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE 6: ai_reports
-- Full AI-generated business intelligence report
-- ============================================================
CREATE TABLE public.ai_reports (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  business_summary    TEXT,
  strengths           JSONB,    -- [{title, description, platform?}]
  weaknesses          JSONB,    -- [{title, description, platform?}]
  opportunities       JSONB,    -- [{title, description, impact}]
  growth_roadmap      JSONB,    -- {immediate: [], medium_term: [], long_term: []}
  overall_score       INTEGER CHECK (overall_score BETWEEN 0 AND 100),
  brand_score         INTEGER CHECK (brand_score BETWEEN 0 AND 100),
  content_score       INTEGER CHECK (content_score BETWEEN 0 AND 100),
  audience_score      INTEGER CHECK (audience_score BETWEEN 0 AND 100),
  prompt_context      JSONB,    -- snapshot of context sent to Claude (for audit/re-gen)
  model_used          TEXT NOT NULL DEFAULT 'claude-sonnet-4-6',
  status              TEXT NOT NULL DEFAULT 'generating' CHECK (status IN ('generating', 'complete', 'failed')),
  generated_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE 7: recommendations
-- Actionable items extracted from the AI report
-- ============================================================
CREATE TABLE public.recommendations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  ai_report_id    UUID REFERENCES public.ai_reports(id) ON DELETE SET NULL,
  type            TEXT NOT NULL CHECK (type IN ('content', 'branding', 'posting', 'engagement', 'strategy')),
  title           TEXT NOT NULL,
  description     TEXT,
  priority        TEXT NOT NULL CHECK (priority IN ('immediate', 'medium_term', 'long_term')),
  platform        TEXT,
  is_completed    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE 8: dashboard_metrics
-- Denormalized summary for fast dashboard loads; one row per user
-- ============================================================
CREATE TABLE public.dashboard_metrics (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  overall_business_score      INTEGER,
  brand_score                 INTEGER,
  content_score               INTEGER,
  audience_alignment_score    INTEGER,
  platforms_connected         INTEGER NOT NULL DEFAULT 0,
  last_scan_at                TIMESTAMPTZ,
  metrics_snapshot            JSONB,    -- per-platform metric summary
  calculated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id)
);

-- ============================================================
-- TABLE 9: content_suggestions
-- AI-generated content ideas linked to the report
-- ============================================================
CREATE TABLE public.content_suggestions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  ai_report_id    UUID REFERENCES public.ai_reports(id) ON DELETE SET NULL,
  platform        TEXT,
  content_type    TEXT,   -- 'reel', 'post', 'video', 'story', 'carousel'
  title           TEXT,
  description     TEXT,
  hook            TEXT,
  hashtags        TEXT[],
  suggested_time  TEXT,
  priority        INTEGER NOT NULL DEFAULT 0,
  is_used         BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE 10: goals
-- User-selected goals from onboarding; referenced in AI analysis
-- ============================================================
CREATE TABLE public.goals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  goal_type       TEXT NOT NULL CHECK (goal_type IN (
                    'increase_revenue', 'increase_audience', 'build_authority',
                    'improve_engagement', 'improve_conversion', 'build_brand_awareness'
                  )),
  description     TEXT,
  target_value    TEXT,
  timeline        TEXT CHECK (timeline IN ('7_days', '30_days', '90_days')),
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Indexes

```sql
CREATE INDEX idx_business_profiles_user_id       ON public.business_profiles(user_id);
CREATE INDEX idx_onboarding_answers_user_id       ON public.onboarding_answers(user_id);
CREATE INDEX idx_onboarding_answers_step          ON public.onboarding_answers(user_id, step);
CREATE INDEX idx_social_accounts_user_id          ON public.social_accounts(user_id);
CREATE INDEX idx_social_accounts_platform         ON public.social_accounts(user_id, platform);
CREATE INDEX idx_social_analysis_user_id          ON public.social_analysis(user_id);
CREATE INDEX idx_social_analysis_account_id       ON public.social_analysis(social_account_id);
CREATE INDEX idx_ai_reports_user_id               ON public.ai_reports(user_id);
CREATE INDEX idx_ai_reports_status                ON public.ai_reports(user_id, status);
CREATE INDEX idx_recommendations_user_id          ON public.recommendations(user_id);
CREATE INDEX idx_recommendations_report_id        ON public.recommendations(ai_report_id);
CREATE INDEX idx_content_suggestions_user_id      ON public.content_suggestions(user_id);
CREATE INDEX idx_goals_user_id                    ON public.goals(user_id);
```

### Row-Level Security Policies

The pattern is identical for all user-owned tables: select/insert/update scoped to `auth.uid() = user_id`. Service role (Edge Functions) bypasses RLS automatically.

```sql
-- Apply to: users, business_profiles, onboarding_answers, social_accounts,
--           social_analysis, ai_reports, recommendations, dashboard_metrics,
--           content_suggestions, goals

-- Example shown for business_profiles; repeat for all tables:
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own" ON public.business_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "insert_own" ON public.business_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own" ON public.business_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- users table: users can read their own row; insert handled by trigger
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "update_own" ON public.users
  FOR UPDATE USING (auth.uid() = id);
```

---

## 4. Auth Flow

### Flow Diagram

```
User arrives
    │
    ▼
middleware.js
    ├─ No session + /dashboard/* → redirect /login
    ├─ Session + onboarding_completed=false + not on /onboarding → redirect /onboarding/1
    ├─ Session + /login or /signup → redirect /dashboard
    └─ Otherwise → pass through
    │
    ▼
/login or /signup
    ├─ Email/password → supabase.auth.signInWithPassword / signUp
    └─ Google → supabase.auth.signInWithOAuth({ provider: 'google' })
                    → Google OAuth → /auth/callback
    │
    ▼
/app/(auth)/auth/callback/route.js
    → supabase.auth.exchangeCodeForSession(code)
    → redirect to /dashboard (or /onboarding/1 if new user)
    │
    ▼
Session cookie set (httpOnly, managed by @supabase/ssr)
```

### Middleware (`middleware.js`)

```javascript
// Runs on every matched request; refreshes session cookie automatically
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { /* get/set/remove on request/response */ } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  if (!user && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (!user && path.startsWith('/onboarding')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (!user && path.startsWith('/connect')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (user && (path === '/login' || path === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Onboarding gate: check completion flag
  if (user && path.startsWith('/dashboard')) {
    const { data: userData } = await supabase
      .from('users').select('onboarding_completed').eq('id', user.id).single()
    if (userData && !userData.onboarding_completed) {
      return NextResponse.redirect(new URL('/onboarding/1', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding/:path*', '/connect/:path*', '/login', '/signup'],
}
```

### Session in Components

- **Server Components / API Routes:** `createServerClient` from `@supabase/ssr`
- **Client Components:** `createBrowserClient` from `@supabase/ssr` (singleton in `lib/supabase/client.js`)
- **Edge Functions:** Use service role key via environment variable

---

## 5. AI Orchestration Design

### Data Flow

```
onboarding_answers (DB)  ─┐
business_profiles (DB)   ─┤
goals (DB)               ─┤──► context.js (assembleBusinessContext)
social_analysis (DB)     ─┘                │
                                           ▼
                               prompts/analysis.js
                               (injects context into prompt template)
                                           │
                                           ▼
                               claude.js (Anthropic SDK)
                               model: claude-sonnet-4-6
                               max_tokens: 4096
                               response_format: JSON object
                                           │
                                           ▼
                               Parsed JSON → stored in:
                               ├── ai_reports (summary, scores, SWOT, roadmap)
                               ├── recommendations (flattened action items)
                               ├── content_suggestions (content ideas)
                               └── dashboard_metrics (score snapshot)
```

### Context Assembly (`lib/ai/context.js`)

```javascript
// Loads all user data from DB and shapes it into the AI prompt context
export async function assembleBusinessContext(userId, supabaseAdmin) {
  const [profile, answers, socialData, goals] = await Promise.all([
    supabaseAdmin.from('business_profiles').select('*').eq('user_id', userId).single(),
    supabaseAdmin.from('onboarding_answers').select('*').eq('user_id', userId).order('step'),
    supabaseAdmin.from('social_analysis').select('*').eq('user_id', userId),
    supabaseAdmin.from('goals').select('*').eq('user_id', userId),
  ])

  return {
    business: profile.data,
    questionnaire: answers.data,
    social: socialData.data,
    goals: goals.data,
  }
}
```

### Prompt Architecture (`lib/ai/prompts/analysis.js`)

All prompts are pure functions: they take context, return a string. No prompts are stored in the database. The `prompt_context` column in `ai_reports` stores the assembled context object (not the final prompt string) for auditability and re-generation.

```javascript
export function buildAnalysisPrompt(context) {
  return `You are a senior marketing strategist and business growth consultant.

Analyse the following business and social media data and return a JSON object matching exactly this schema:
{
  "business_summary": "string",
  "overall_score": 0-100,
  "brand_score": 0-100,
  "content_score": 0-100,
  "audience_score": 0-100,
  "strengths": [{"title": "string", "description": "string", "platform": "string|null"}],
  "weaknesses": [{"title": "string", "description": "string", "platform": "string|null"}],
  "opportunities": [{"title": "string", "description": "string", "impact": "high|medium|low"}],
  "growth_roadmap": {
    "immediate": [{"action": "string", "effort": "low|medium|high"}],
    "medium_term": [{"action": "string", "timeframe": "string"}],
    "long_term": [{"action": "string", "outcome": "string"}]
  }
}

Business Context:
${JSON.stringify(context, null, 2)}

Return ONLY valid JSON. No markdown. No explanation.`
}
```

### AI Memory Design

"Business memory" in Phase 1 = **structured context injection**. Every AI call loads the full `onboarding_answers` + `business_profiles` + `goals` + `social_analysis` records from the database and injects them as JSON into the prompt. This is sufficient for Phase 1 and works within Claude's 200K context window.

There is no vector database, embeddings store, or RAG pipeline in Phase 1. This is intentional — the business profile is small (< 2KB), so full context injection is faster and simpler.

### Scan Trigger (Edge Function)

The heavy AI processing runs in a **Supabase Edge Function** named `process-social-scan`. This avoids Vercel's 10-second default timeout.

```
Frontend (connect page)
    │
    ▼ POST /api/ai/scan   (Next.js API route)
    │   → Verifies user session
    │   → Invokes Edge Function via supabase.functions.invoke('process-social-scan')
    │   → Returns 202 { status: 'processing', reportId }
    │
    ▼ Supabase Realtime subscription on ai_reports WHERE user_id = currentUser
    │   → Frontend subscribes immediately after 202 response
    │   → When ai_reports.status changes to 'complete' → dashboard updates live
    │
    ▼ Edge Function (async)
        1. Fetch social data from platform APIs (using stored tokens)
        2. Store raw data in social_analysis
        3. assembleBusinessContext(userId)
        4. Call Claude API → parse JSON response
        5. Insert into ai_reports (status: 'complete')
        6. Insert into recommendations, content_suggestions
        7. Upsert dashboard_metrics
```

---

## 6. Social Integration Plan

### Platform Overview

| Platform | OAuth Provider | API | Review Required | Complexity |
|---|---|---|---|---|
| YouTube | Google | YouTube Data API v3 | No (basic read) | Low |
| Facebook | Meta | Graph API v19 | Dev mode: No / Prod: Yes | Medium |
| Instagram | Meta | Graph API via Facebook Login | Yes (app review ~2 weeks) | High |

### Build Order

**Phase 1a:** YouTube → **Phase 1b:** Facebook → **Phase 1c:** Instagram

---

### YouTube

**OAuth Endpoint:** `https://accounts.google.com/o/oauth2/auth`
**Scopes:** `https://www.googleapis.com/auth/youtube.readonly`
**Token Exchange:** `https://oauth2.googleapis.com/token`
**Data Fetched:**
```
GET https://www.googleapis.com/youtube/v3/channels
  ?part=snippet,statistics,brandingSettings
  &mine=true

GET https://www.googleapis.com/youtube/v3/videos
  ?part=snippet,statistics
  &forMine=true&maxResults=20
```
**Data Shape Stored in `social_analysis.raw_data`:**
```json
{
  "channel": { "title", "description", "subscriberCount", "videoCount", "viewCount" },
  "recent_videos": [{ "title", "viewCount", "likeCount", "commentCount", "publishedAt" }],
  "upload_frequency_days": 7.3
}
```

---

### Facebook

**OAuth Endpoint:** `https://www.facebook.com/v19.0/dialog/oauth`
**Scopes:** `pages_show_list,pages_read_engagement,pages_read_user_content`
**Data Fetched:**
```
GET /me/accounts  (list pages)
GET /{page-id}?fields=name,fan_count,posts{message,created_time,reactions.summary(true),comments.summary(true)}
```
**Token Storage:** Page access token stored in `social_accounts.access_token`. Page tokens are long-lived (60 days) but can be extended via `/oauth/access_token?grant_type=fb_exchange_token`.

---

### Instagram

**OAuth Endpoint:** `https://www.facebook.com/v19.0/dialog/oauth` (same as Facebook)
**Scopes:** `instagram_basic,instagram_content_publish,pages_show_list`
**Requires:** User must have Instagram Business/Creator account connected to a Facebook Page
**Data Fetched:**
```
GET /me/accounts → get page → GET /{page-id}?fields=instagram_business_account
GET /{ig-user-id}?fields=biography,followers_count,media_count,username
GET /{ig-user-id}/media?fields=media_type,like_count,comments_count,timestamp&limit=20
```
**UI Note:** Show a "requires Instagram Business account" notice before the connect flow, with a link to Instagram's account upgrade guide.

---

### Token Security

Access tokens are sensitive. Store them in `social_accounts.access_token` **encrypted at the application layer** using AES-256-GCM before writing to the database. Key stored in `ENCRYPTION_KEY` env variable. Supabase Vault is available as an alternative but adds operational complexity for Phase 1.

---

### Scan Trigger

Scan triggers automatically when:
1. A new `social_accounts` row is inserted (via a Postgres trigger that invokes the Edge Function), OR
2. User manually clicks "Re-scan" on the dashboard (calls `/api/ai/scan`)

---

## 7. Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI
ANTHROPIC_API_KEY=sk-ant-...

# Token encryption
ENCRYPTION_KEY=32-byte-hex-string-generated-with-openssl

# Social OAuth — Google / YouTube
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...

# Social OAuth — Meta (Facebook + Instagram share one app)
META_APP_ID=
META_APP_SECRET=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000   # change to https://yourdomain.com in production
```

**Note:** `ANTHROPIC_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ENCRYPTION_KEY`, `GOOGLE_CLIENT_SECRET`, and `META_APP_SECRET` must NEVER be prefixed with `NEXT_PUBLIC_`. They are server-only.

---

## 8. Phase 1 Milestone Breakdown

### M1 — Project Setup + Auth
**Deliverable:** A deployed app where users can sign up, log in with email or Google, and are redirected correctly.

Acceptance criteria:
- [ ] Next.js 14 app with App Router scaffolded, Tailwind configured, design tokens applied
- [ ] Supabase project created; schema migration 0001 applied
- [ ] Email signup/login working; session persists across refresh
- [ ] Google OAuth working; `users` table row created on signup via trigger
- [ ] `middleware.js` redirects unauthenticated users from `/dashboard` to `/login`
- [ ] `middleware.js` redirects authenticated users with `onboarding_completed=false` to `/onboarding/1`
- [ ] Login and signup pages match design system (colors, typography, spacing)

---

### M2 — Onboarding Questionnaire
**Deliverable:** A conversational, animated multi-step questionnaire that stores all answers and marks onboarding complete.

Acceptance criteria:
- [ ] All 6 sections, ~22 questions defined in `config/questions.js`
- [ ] One question visible at a time; answer types: text input, single select, multi-select
- [ ] Framer Motion slide/fade transition between questions
- [ ] Progress bar updates per step
- [ ] Each answer upserted to `onboarding_answers` in real time (no "save all at end")
- [ ] `business_profiles` upserted from business basics answers
- [ ] `goals` rows inserted from business goals answers
- [ ] `users.onboarding_completed` set to `true` on final step submission
- [ ] Onboarding is resumable: if user drops off at step 4 and returns, they continue from step 4

---

### M3 — Dashboard Shell
**Deliverable:** The app layout and empty/loading states for all dashboard sections.

Acceptance criteria:
- [ ] Sidebar navigation with links to Overview, Insights, Social, Roadmap
- [ ] Dashboard overview page renders with skeleton/loading cards
- [ ] Score rings display placeholder values with correct visual design
- [ ] "Connect your social accounts" empty state shown when no accounts connected
- [ ] Responsive layout (desktop-first, mobile readable)

---

### M4 — Social Account Connection
**Deliverable:** Users can connect YouTube, then Facebook, then Instagram. Tokens stored securely.

Acceptance criteria:
- [ ] YouTube OAuth connect flow working end-to-end; token stored encrypted
- [ ] Facebook Pages OAuth connect flow working; page token stored
- [ ] Instagram Business account flow working (requires test business account)
- [ ] Connected accounts displayed in `/connect` with avatar, username, follower count
- [ ] Disconnect button removes the `social_accounts` row and marks `is_active = false`
- [ ] On successful connection, `/api/ai/scan` is called and a "Scanning..." state shown in dashboard
- [ ] Each platform connection is independent; connecting one does not require others

---

### M5 — AI Scan Engine
**Deliverable:** The Edge Function fetches real social data, sends it to Claude, and stores a complete AI report.

Acceptance criteria:
- [ ] Edge Function `process-social-scan` deployed and invokable
- [ ] YouTube data (channel stats, recent 20 videos) fetched and stored in `social_analysis`
- [ ] Facebook page data fetched and stored
- [ ] Instagram profile + recent posts fetched and stored
- [ ] `assembleBusinessContext` correctly combines onboarding answers + social data
- [ ] Claude API call returns valid JSON matching the `ai_reports` schema
- [ ] `ai_reports` row inserted with `status: 'complete'`
- [ ] `recommendations` rows (min 5) inserted
- [ ] `content_suggestions` rows (min 5) inserted
- [ ] `dashboard_metrics` upserted with correct scores
- [ ] Error path: if Claude fails, `ai_reports.status` set to `'failed'`; dashboard shows retry CTA

---

### M6 — Insights Render
**Deliverable:** All dashboard sections populated with real AI-generated data. The complete user experience, start to finish.

Acceptance criteria:
- [ ] Overview cards show real scores from `dashboard_metrics`
- [ ] Business Summary section shows `ai_reports.business_summary`
- [ ] Strengths, Weaknesses, Opportunities rendered as cards from `ai_reports.strengths/weaknesses/opportunities`
- [ ] Social Breakdown shows per-platform scores from `social_analysis`
- [ ] Recommendations list rendered, sortable by priority
- [ ] Roadmap timeline shows 7/30/90-day actions from `ai_reports.growth_roadmap`
- [ ] Content suggestions shown as cards
- [ ] Supabase Realtime subscription updates dashboard live when scan completes (no refresh needed)
- [ ] Full user journey test: sign up → onboard → connect YouTube → scan completes → dashboard shows real data

---

## 9. Design Token File (Tailwind Config Extension)

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // From spec — exact hex values
        bg: {
          primary: '#FAFAFA',
          secondary: '#F3F4F6',
        },
        accent: {
          blue: '#4F8EF7',        // main CTA, links, active states
          purple: '#8B7CF6',      // premium highlights, gradients
        },
        neutral: {
          navy: '#1E293B',        // dark backgrounds, sidebar
        },
        status: {
          success: '#35C38F',
          warning: '#F4A261',
          error: '#E76F51',
        },
        content: {
          primary: '#111827',     // body text
          secondary: '#6B7280',   // captions, metadata
        },
      },
      fontFamily: {
        // SF Pro renders via system-ui on Apple devices — no font embedding needed
        sans: ['Inter', 'system-ui', '-apple-system', 'Poppins', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Dashboard-readable scale
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg':    ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body-md':    ['1rem',     { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm':    ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'label':      ['0.75rem',  { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      spacing: {
        // Generous whitespace per design philosophy
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'card': '1rem',
        'pill': '9999px',
      },
      boxShadow: {
        'card':    '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'card-md': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'card-lg': '0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
```

---

## Open Questions for Review

Before starting M1, please confirm:

1. **AI provider:** Claude only for Phase 1 (recommended) — agreed?
2. **Instagram build order:** Build last; requires Meta app review submission on Day 1 — agreed?
3. **Token encryption:** Application-level AES-256 vs Supabase Vault — preference?
4. **Vercel plan:** Free tier (10s timeout) is fine if AI processing is in Edge Functions — confirmed?
5. **Meta app:** Do you have an existing Meta Developer app, or does one need to be created?
6. **Google app:** Do you have an existing Google Cloud project / OAuth credentials?
