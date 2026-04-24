-- ============================================================
-- SAFE RESET — run this if 0001 was applied incorrectly.
-- Drops everything and recreates from scratch.
-- Go to Supabase → SQL Editor → New query → paste → Run
-- ============================================================

-- Drop trigger + function first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop all app tables (CASCADE handles FK dependencies)
DROP TABLE IF EXISTS public.goals               CASCADE;
DROP TABLE IF EXISTS public.content_suggestions CASCADE;
DROP TABLE IF EXISTS public.dashboard_metrics   CASCADE;
DROP TABLE IF EXISTS public.recommendations     CASCADE;
DROP TABLE IF EXISTS public.ai_reports          CASCADE;
DROP TABLE IF EXISTS public.social_analysis     CASCADE;
DROP TABLE IF EXISTS public.social_accounts     CASCADE;
DROP TABLE IF EXISTS public.onboarding_answers  CASCADE;
DROP TABLE IF EXISTS public.business_profiles   CASCADE;
DROP TABLE IF EXISTS public.users               CASCADE;

-- ============================================================
-- TABLE 1: users
-- ============================================================
CREATE TABLE public.users (
  id                    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email                 TEXT UNIQUE NOT NULL,
  full_name             TEXT,
  avatar_url            TEXT,
  onboarding_completed  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_select_own" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_insert_own" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- TABLE 2: business_profiles
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
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bp_select" ON public.business_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bp_insert" ON public.business_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bp_update" ON public.business_profiles FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 3: onboarding_answers (unique per user+step for upsert)
-- ============================================================
CREATE TABLE public.onboarding_answers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  step        INTEGER NOT NULL,
  section     TEXT NOT NULL,
  question    TEXT NOT NULL,
  answer      JSONB NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, step)
);
ALTER TABLE public.onboarding_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "oa_select" ON public.onboarding_answers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "oa_insert" ON public.onboarding_answers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "oa_update" ON public.onboarding_answers FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 4: social_accounts
-- ============================================================
CREATE TABLE public.social_accounts (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  platform            TEXT NOT NULL CHECK (platform IN ('instagram', 'youtube', 'facebook')),
  platform_user_id    TEXT NOT NULL,
  username            TEXT,
  display_name        TEXT,
  access_token        TEXT NOT NULL,
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
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sa_select" ON public.social_accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "sa_insert" ON public.social_accounts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sa_update" ON public.social_accounts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "sa_delete" ON public.social_accounts FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 5: social_analysis
-- ============================================================
CREATE TABLE public.social_analysis (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  social_account_id       UUID NOT NULL REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  platform                TEXT NOT NULL,
  raw_data                JSONB,
  profile_score           INTEGER CHECK (profile_score BETWEEN 0 AND 100),
  engagement_rate         NUMERIC(6,2),
  posting_frequency_score INTEGER CHECK (posting_frequency_score BETWEEN 0 AND 100),
  content_quality_score   INTEGER CHECK (content_quality_score BETWEEN 0 AND 100),
  branding_score          INTEGER CHECK (branding_score BETWEEN 0 AND 100),
  analysis_data           JSONB,
  scanned_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.social_analysis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "so_select" ON public.social_analysis FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "so_insert" ON public.social_analysis FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- TABLE 6: ai_reports
-- ============================================================
CREATE TABLE public.ai_reports (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  business_summary    TEXT,
  strengths           JSONB,
  weaknesses          JSONB,
  opportunities       JSONB,
  growth_roadmap      JSONB,
  overall_score       INTEGER CHECK (overall_score BETWEEN 0 AND 100),
  brand_score         INTEGER CHECK (brand_score BETWEEN 0 AND 100),
  content_score       INTEGER CHECK (content_score BETWEEN 0 AND 100),
  audience_score      INTEGER CHECK (audience_score BETWEEN 0 AND 100),
  prompt_context      JSONB,
  model_used          TEXT NOT NULL DEFAULT 'claude-sonnet-4-6',
  status              TEXT NOT NULL DEFAULT 'generating' CHECK (status IN ('generating','complete','failed')),
  generated_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.ai_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ar_select" ON public.ai_reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ar_insert" ON public.ai_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "ar_update" ON public.ai_reports FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 7: recommendations
-- ============================================================
CREATE TABLE public.recommendations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  ai_report_id    UUID REFERENCES public.ai_reports(id) ON DELETE SET NULL,
  type            TEXT NOT NULL CHECK (type IN ('content','branding','posting','engagement','strategy')),
  title           TEXT NOT NULL,
  description     TEXT,
  priority        TEXT NOT NULL CHECK (priority IN ('immediate','medium_term','long_term')),
  platform        TEXT,
  is_completed    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rec_select" ON public.recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "rec_insert" ON public.recommendations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "rec_update" ON public.recommendations FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 8: dashboard_metrics
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
  metrics_snapshot            JSONB,
  calculated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id)
);
ALTER TABLE public.dashboard_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dm_select" ON public.dashboard_metrics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "dm_insert" ON public.dashboard_metrics FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "dm_update" ON public.dashboard_metrics FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 9: content_suggestions
-- ============================================================
CREATE TABLE public.content_suggestions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  ai_report_id    UUID REFERENCES public.ai_reports(id) ON DELETE SET NULL,
  platform        TEXT,
  content_type    TEXT,
  title           TEXT,
  description     TEXT,
  hook            TEXT,
  hashtags        TEXT[],
  suggested_time  TEXT,
  priority        INTEGER NOT NULL DEFAULT 0,
  is_used         BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.content_suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cs_select" ON public.content_suggestions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "cs_insert" ON public.content_suggestions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "cs_update" ON public.content_suggestions FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 10: goals
-- ============================================================
CREATE TABLE public.goals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  goal_type       TEXT NOT NULL CHECK (goal_type IN (
                    'increase_revenue','increase_audience','build_authority',
                    'improve_engagement','improve_conversion','build_brand_awareness'
                  )),
  description     TEXT,
  target_value    TEXT,
  timeline        TEXT CHECK (timeline IN ('7_days','30_days','90_days')),
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','completed','paused')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "go_select" ON public.goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "go_insert" ON public.goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "go_update" ON public.goals FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_bp_user      ON public.business_profiles(user_id);
CREATE INDEX idx_oa_user      ON public.onboarding_answers(user_id);
CREATE INDEX idx_sa_user      ON public.social_accounts(user_id);
CREATE INDEX idx_soa_user     ON public.social_analysis(user_id);
CREATE INDEX idx_ar_user      ON public.ai_reports(user_id);
CREATE INDEX idx_rec_user     ON public.recommendations(user_id);
CREATE INDEX idx_cs_user      ON public.content_suggestions(user_id);
CREATE INDEX idx_goals_user   ON public.goals(user_id);

-- ============================================================
-- TRIGGER: auto-create public.users on auth signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
