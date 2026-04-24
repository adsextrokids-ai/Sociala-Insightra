-- ============================================================
-- Social AI Platform — Initial Schema
-- Migration: 0001_initial_schema
-- Apply via: Supabase Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- ============================================================
-- TABLE 1: users
-- Extended profile for each auth user. Created automatically
-- by the handle_new_user trigger on auth.users insert.
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

CREATE POLICY "users_select_own" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- TABLE 2: business_profiles
-- One row per user, populated during onboarding.
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

CREATE POLICY "business_profiles_select_own" ON public.business_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "business_profiles_insert_own" ON public.business_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "business_profiles_update_own" ON public.business_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 3: onboarding_answers
-- Individual Q&A pairs — this is the AI memory source.
-- ============================================================
CREATE TABLE public.onboarding_answers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  step        INTEGER NOT NULL,
  section     TEXT NOT NULL,
  question    TEXT NOT NULL,
  answer      JSONB NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.onboarding_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "onboarding_answers_select_own" ON public.onboarding_answers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "onboarding_answers_insert_own" ON public.onboarding_answers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "onboarding_answers_update_own" ON public.onboarding_answers
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 4: social_accounts
-- Connected OAuth tokens — one row per user per platform.
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

CREATE POLICY "social_accounts_select_own" ON public.social_accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "social_accounts_insert_own" ON public.social_accounts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "social_accounts_update_own" ON public.social_accounts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "social_accounts_delete_own" ON public.social_accounts
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 5: social_analysis
-- Raw + scored data from platform APIs per scan.
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

CREATE POLICY "social_analysis_select_own" ON public.social_analysis
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "social_analysis_insert_own" ON public.social_analysis
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- TABLE 6: ai_reports
-- Full AI-generated business intelligence report per user.
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
  status              TEXT NOT NULL DEFAULT 'generating'
    CHECK (status IN ('generating', 'complete', 'failed')),
  generated_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.ai_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ai_reports_select_own" ON public.ai_reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "ai_reports_insert_own" ON public.ai_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ai_reports_update_own" ON public.ai_reports
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 7: recommendations
-- Actionable items extracted from the AI report.
-- ============================================================
CREATE TABLE public.recommendations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  ai_report_id    UUID REFERENCES public.ai_reports(id) ON DELETE SET NULL,
  type            TEXT NOT NULL
    CHECK (type IN ('content', 'branding', 'posting', 'engagement', 'strategy')),
  title           TEXT NOT NULL,
  description     TEXT,
  priority        TEXT NOT NULL
    CHECK (priority IN ('immediate', 'medium_term', 'long_term')),
  platform        TEXT,
  is_completed    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "recommendations_select_own" ON public.recommendations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "recommendations_insert_own" ON public.recommendations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "recommendations_update_own" ON public.recommendations
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 8: dashboard_metrics
-- Denormalized summary for fast dashboard loads.
-- One row per user — upserted after each AI report.
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

CREATE POLICY "dashboard_metrics_select_own" ON public.dashboard_metrics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "dashboard_metrics_insert_own" ON public.dashboard_metrics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "dashboard_metrics_update_own" ON public.dashboard_metrics
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 9: content_suggestions
-- AI-generated content ideas linked to a report.
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

CREATE POLICY "content_suggestions_select_own" ON public.content_suggestions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "content_suggestions_insert_own" ON public.content_suggestions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "content_suggestions_update_own" ON public.content_suggestions
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE 10: goals
-- User-selected goals from the onboarding questionnaire.
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
  status          TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'completed', 'paused')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "goals_select_own" ON public.goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "goals_insert_own" ON public.goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "goals_update_own" ON public.goals
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_business_profiles_user_id    ON public.business_profiles(user_id);
CREATE INDEX idx_onboarding_answers_user_id   ON public.onboarding_answers(user_id);
CREATE INDEX idx_onboarding_answers_step      ON public.onboarding_answers(user_id, step);
CREATE INDEX idx_social_accounts_user_id      ON public.social_accounts(user_id);
CREATE INDEX idx_social_accounts_platform     ON public.social_accounts(user_id, platform);
CREATE INDEX idx_social_analysis_user_id      ON public.social_analysis(user_id);
CREATE INDEX idx_social_analysis_account_id   ON public.social_analysis(social_account_id);
CREATE INDEX idx_ai_reports_user_id           ON public.ai_reports(user_id);
CREATE INDEX idx_ai_reports_status            ON public.ai_reports(user_id, status);
CREATE INDEX idx_recommendations_user_id      ON public.recommendations(user_id);
CREATE INDEX idx_recommendations_report_id    ON public.recommendations(ai_report_id);
CREATE INDEX idx_content_suggestions_user_id  ON public.content_suggestions(user_id);
CREATE INDEX idx_goals_user_id                ON public.goals(user_id);

-- ============================================================
-- TRIGGER: auto-create public.users row on auth signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
