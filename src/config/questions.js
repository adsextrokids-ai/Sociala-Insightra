export const QUESTIONS = [
  // ── Business Basics ─────────────────────────────────────────
  {
    step: 1,  section: 'business_basics', sectionLabel: 'Business Basics',
    type: 'text', question: 'What is your business name?',
    placeholder: 'e.g. Bloom Skincare', profileKey: 'business_name',
  },
  {
    step: 2,  section: 'business_basics', sectionLabel: 'Business Basics',
    type: 'text', question: 'What industry are you in?',
    placeholder: 'e.g. Beauty, Tech, Fitness, Food', profileKey: 'industry',
  },
  {
    step: 3,  section: 'business_basics', sectionLabel: 'Business Basics',
    type: 'select', question: 'Do you sell products or services?',
    options: ['Products', 'Services', 'Both'], profileKey: 'business_type',
  },
  {
    step: 4,  section: 'business_basics', sectionLabel: 'Business Basics',
    type: 'select', question: 'How long have you been operating?',
    options: ['Less than 1 year', '1–2 years', '3–5 years', '5+ years'], profileKey: 'operating_since',
  },
  {
    step: 5,  section: 'business_basics', sectionLabel: 'Business Basics',
    type: 'text', question: 'What is your business category?',
    placeholder: 'e.g. E-commerce, Coaching, Agency, Creator', profileKey: 'category',
  },

  // ── Brand Identity ───────────────────────────────────────────
  {
    step: 6,  section: 'identity', sectionLabel: 'Brand Identity',
    type: 'text', question: 'What makes your business different from competitors?',
    placeholder: 'Your unique edge or differentiator...', profileKey: 'differentiator',
  },
  {
    step: 7,  section: 'identity', sectionLabel: 'Brand Identity',
    type: 'text', question: 'Why should people trust your brand?',
    placeholder: 'Your credibility, proof, or story...', profileKey: 'trust_factors',
  },
  {
    step: 8,  section: 'identity', sectionLabel: 'Brand Identity',
    type: 'multiselect', question: 'What are your biggest strengths?',
    options: ['Product quality', 'Customer service', 'Pricing', 'Expertise', 'Community', 'Content creation', 'Branding'],
    profileKey: 'strengths',
  },
  {
    step: 9,  section: 'identity', sectionLabel: 'Brand Identity',
    type: 'multiselect', question: 'What values does your brand stand for?',
    options: ['Authenticity', 'Innovation', 'Quality', 'Community', 'Sustainability', 'Transparency', 'Fun & creativity'],
    profileKey: 'brand_values',
  },

  // ── Goals ────────────────────────────────────────────────────
  {
    step: 10, section: 'goals', sectionLabel: 'Your Goals',
    type: 'multiselect', question: 'What are your main goals? Select all that apply.',
    options: ['Increase revenue', 'Increase audience', 'Build authority', 'Improve engagement', 'Improve conversion', 'Build brand awareness'],
    goalMap: true, profileKey: null,
  },

  // ── Challenges ───────────────────────────────────────────────
  {
    step: 11, section: 'challenges', sectionLabel: 'Challenges',
    type: 'text', question: 'What are your biggest struggles right now?',
    placeholder: 'e.g. Low reach, inconsistent posting, poor engagement...', profileKey: null,
  },
  {
    step: 12, section: 'challenges', sectionLabel: 'Challenges',
    type: 'text', question: 'What do you feel is missing from your current strategy?',
    placeholder: 'What gap do you see...', profileKey: null,
  },
  {
    step: 13, section: 'challenges', sectionLabel: 'Challenges',
    type: 'text', question: 'What are your current bottlenecks?',
    placeholder: 'What slows you down or blocks growth most...', profileKey: null,
  },

  // ── Content Strategy ─────────────────────────────────────────
  {
    step: 14, section: 'content', sectionLabel: 'Content Strategy',
    type: 'multiselect', question: 'Which platforms do you currently use?',
    options: ['Instagram', 'YouTube', 'Facebook', 'TikTok', 'LinkedIn', 'Twitter / X', 'Pinterest'],
    profileKey: 'posting_platforms',
  },
  {
    step: 15, section: 'content', sectionLabel: 'Content Strategy',
    type: 'select', question: 'How often do you post?',
    options: ['Daily', 'A few times a week', 'Weekly', 'A few times a month', 'Rarely or never'],
    profileKey: 'posting_frequency',
  },
  {
    step: 16, section: 'content', sectionLabel: 'Content Strategy',
    type: 'multiselect', question: 'What type of content do you create?',
    options: ['Short videos / Reels', 'Long-form video', 'Photos / Carousels', 'Stories', 'Blog / Articles', 'Podcasts', 'Live streams'],
    profileKey: 'content_types',
  },
  {
    step: 17, section: 'content', sectionLabel: 'Content Strategy',
    type: 'boolean', question: 'Do you run paid ads on any platform?',
    profileKey: 'runs_ads',
  },
  {
    step: 18, section: 'content', sectionLabel: 'Content Strategy',
    type: 'text', question: 'What type of audience do you target?',
    placeholder: 'e.g. Women 25–40 interested in wellness and self-care...', profileKey: 'target_audience',
  },

  // ── Expectations ─────────────────────────────────────────────
  {
    step: 19, section: 'expectations', sectionLabel: 'Expectations',
    type: 'text', question: 'What do you expect from Social AI?',
    placeholder: 'What would make this worth it for you...', profileKey: null,
  },
  {
    step: 20, section: 'expectations', sectionLabel: 'Expectations',
    type: 'text', question: 'What would success look like for you in 90 days?',
    placeholder: 'Describe your ideal outcome...', profileKey: null,
  },
  {
    step: 21, section: 'expectations', sectionLabel: 'Expectations',
    type: 'text', question: 'What is the #1 thing you want to improve first?',
    placeholder: 'The single most important thing...', profileKey: null,
  },
]

export const TOTAL_STEPS = QUESTIONS.length

export const GOAL_TYPE_MAP = {
  'Increase revenue':      'increase_revenue',
  'Increase audience':     'increase_audience',
  'Build authority':       'build_authority',
  'Improve engagement':    'improve_engagement',
  'Improve conversion':    'improve_conversion',
  'Build brand awareness': 'build_brand_awareness',
}

export const SECTION_COLORS = {
  business_basics: { bg: 'bg-accent-blue/10',    text: 'text-accent-blue'    },
  identity:        { bg: 'bg-accent-purple/10',  text: 'text-accent-purple'  },
  goals:           { bg: 'bg-status-success/10', text: 'text-status-success' },
  challenges:      { bg: 'bg-status-warning/10', text: 'text-status-warning' },
  content:         { bg: 'bg-accent-blue/10',    text: 'text-accent-blue'    },
  expectations:    { bg: 'bg-accent-purple/10',  text: 'text-accent-purple'  },
}
