Your Role

You are a Senior Product Architect, Startup CTO, Full-Stack SaaS Engineer, AI Workflow Designer, UX Strategist, Database Architect, and System Designer.

You are responsible for designing and building a production-ready MVP for an AI-powered social business intelligence platform.

You must think like:

* Product Manager
* SaaS Founder
* System Architect
* AI Engineer
* Growth Consultant
* UX Designer
* Scalable Startup CTO

Do not provide vague ideas.

Everything must be structured, detailed, scalable, and implementation-ready.

---

# Project Name

**Social AI — AI Business Growth & Social Intelligence Platform**

---

# Core Business Vision

Build a modern SaaS application where business owners connect their social accounts and instantly receive AI-powered business intelligence.

The platform should help businesses understand:

* What they are doing right
* What they are doing wrong
* How their current social strategy performs
* Where their growth opportunities exist
* How to improve branding
* How to improve conversion
* What content should be created
* How to scale ecommerce or personal brand growth

The platform acts like an AI marketing consultant + social media strategist + growth analyst.

---

# Primary Goal of MVP

The first version should focus ONLY on:

1. User onboarding
2. Business questionnaire
3. Social profile connection
4. Profile scanning
5. Business analysis
6. AI insight generation
7. Dashboard summary
8. Growth roadmap generation

Do not overbuild.

Build Phase 1 extremely polished.

---

# Recommended Tech Stack

Use **JavaScript as the core language**.

## Frontend

* Next.js
* React.js
* Tailwind CSS
* Framer Motion
* Zustand for state management

## Backend

Use Supabase instead of building a separate backend server.

Use:

* Supabase Database
* Supabase Auth
* Supabase Edge Functions
* Supabase Storage
* Supabase Row-Level Security

No Express.js server required for MVP.

---

## Database

* Supabase PostgreSQL
* Prisma ORM (optional later)

---

## Authentication

* Supabase Auth
* Google Login
* Email Login

---

## AI Layer

* Claude API
* OpenAI API
* Prompt orchestration
* Business memory system

---

## Hosting

* Vercel for frontend deployment
* Supabase for backend infrastructure

---

## Why This Stack

This stack is chosen because:

* Fast MVP development
* Low monthly cost
* Minimal DevOps
* Beginner-friendly
* Easy GitHub integration
* Fast deployment pipeline
* Strong scalability

---

# Product Workflow

## Step 1 — User Login

User creates account.

Authentication options:

* Email signup
* Google login
* Social login

After login, users MUST immediately enter onboarding.

---

## Step 2 — AI Business Discovery Questionnaire

The onboarding process should feel premium and conversational.

The system should ask questions one by one.

Each answer becomes AI memory.

---

# Questionnaire Flow

## Business Basics

Ask:

* What is your business name?
* What industry are you in?
* Do you sell products or services?
* How long have you been operating?
* What is your business category?

---

## Business Identity

Ask:

* What makes your business different?
* Why should people trust your brand?
* What are your biggest strengths?
* What values does your brand stand for?

---

## Business Goals

Ask:

* What is your main goal?
* Increase revenue?
* Increase audience?
* Build authority?
* Improve engagement?
* Improve conversion?
* Build brand awareness?

---

## Business Challenges

Ask:

* What are your biggest struggles?
* What do you feel is missing?
* What are your current bottlenecks?

---

## Content Questions

Ask:

* Which platforms do you use?
* How often do you post?
* What type of content do you create?
* Do you run ads?
* What type of audience do you target?

---

## Expectation Questions

Ask:

* What do you expect from this platform?
* What would success look like for you?
* What do you want to improve first?

---

# Step 3 — Social Account Connection

Allow users to connect:

* Instagram
* YouTube
* Facebook

Future:

* TikTok
* LinkedIn
* Pinterest

Use OAuth integrations.

The platform must securely connect user accounts.

---

# Step 4 — AI Social Scan Engine

When social account connects:

The system should immediately start analysis.

---

## Instagram Analysis

Scan:

* Profile bio
* Username positioning
* Brand clarity
* Posting frequency
* Engagement rate
* Caption quality
* Hashtag quality
* Content consistency
* Visual branding
* Content categories
* Audience engagement
* Post performance trends

---

## YouTube Analysis

Scan:

* Upload frequency
* Thumbnail quality
* Video title strength
* Topic consistency
* Video niche
* Viewer interaction
* Engagement patterns

---

## Facebook Analysis

Scan:

* Page quality
* Posting activity
* Community engagement
* Audience reactions
* Content performance

---

# Step 5 — AI Processing Layer

Combine:

* Questionnaire answers
* Business goals
* Social account analysis
* Content performance
* Brand identity

Then generate:

---

## Business Intelligence Report

### Business Summary

AI explains:

* What the business does
* What makes them unique
* Their growth stage

---

## Strength Analysis

AI identifies:

* Strong content types
* Strong audience engagement
* Good positioning
* Strong categories

---

## Weakness Analysis

AI identifies:

* Branding gaps
* Poor consistency
* Low engagement areas
* Missing content types

---

## Opportunity Engine

AI identifies:

* Untapped opportunities
* Content ideas
* High-conversion content
* Potential audience targets

---

## Growth Roadmap

Generate:

### Immediate Wins

* Quick actions
* Low effort improvements

### Medium-Term Strategy

* Brand improvements
* Content system

### Long-Term Scale

* Growth plan
* Funnel strategy
* Conversion system

---

# Step 6 — Dashboard Experience

The dashboard must feel premium.

---

## Dashboard Sections

### Overview Card

Show:

* Business score
* Brand score
* Content score
* Audience alignment score

---

### Business Summary

Show:

* Business identity
* Goals
* Positioning

---

### AI Insights

Show:

* Strengths
* Weaknesses
* Opportunities

---

### Social Breakdown

Show:

* Instagram performance
* YouTube performance
* Facebook performance

---

### AI Recommendations

Show:

* Suggested content
* Suggested posting schedule
* Suggested branding changes

---

### Roadmap Timeline

Show:

* Next 7 days
* Next 30 days
* Next 90 days

---

# Premium UI Direction

The UI must feel like:

* Apple
* Notion
* Linear
* Stripe
* Modern SaaS

---

# Design Philosophy

* Light mode first
* Minimal UI
* Clean whitespace
* Readable dashboard cards
* Strong typography
* Calm visual hierarchy
* Data-driven visuals
* No clutter

---

# Official Color Palette

## Primary Background

Soft White:

```text
#FAFAFA
```

---

## Secondary Background

Light Gray:

```text
#F3F4F6
```

---

## Main Accent Color

Modern Soft Blue:

```text
#4F8EF7
```

---

## Premium Accent

Soft Purple:

```text
#8B7CF6
```

---

## Dark Neutral

Deep Navy:

```text
#1E293B
```

---

## Success Color

Mint Green:

```text
#35C38F
```

---

## Warning Color

Soft Orange:

```text
#F4A261
```

---

## Error Color

Soft Red:

```text
#E76F51
```

---

## Primary Text

```text
#111827
```

---

## Secondary Text

```text
#6B7280
```

---

# Typography

Use:

* Inter
* SF Pro Display
* Poppins

Typography rules:

* Large headings
* Spacious layout
* Minimal paragraph density
* Dashboard readability

---

# Suggested Folder Structure

```bash
src/
 ├── components/
 ├── pages/
 ├── layouts/
 ├── dashboard/
 ├── onboarding/
 ├── ai/
 ├── api/
 ├── auth/
 ├── hooks/
 ├── lib/
 ├── services/
 ├── social/
 ├── analytics/
 ├── database/
 ├── styles/
 ├── utils/
 └── config/
```

---

# Database Tables Required

Create tables:

* users
* business_profiles
* onboarding_answers
* social_accounts
* social_analysis
* ai_reports
* recommendations
* dashboard_metrics
* content_suggestions
* goals

---

# Core Modules

## Module 1 — Authentication

* Signup
* Login
* Session

---

## Module 2 — Onboarding

* Questions
* AI memory

---

## Module 3 — Social Integrations

* Instagram
* Facebook
* YouTube

---

## Module 4 — AI Processing Engine

* Business analysis
* Insight creation

---

## Module 5 — Dashboard

* Insights
* Scores
* Growth recommendations

---

# Required Deliverables

Claude must generate:

1. Complete database schema
2. API architecture
3. Folder structure
4. User flow
5. Wireframe structure
6. Dashboard layout
7. Backend endpoints
8. AI orchestration system
9. Prompt engineering system
10. Social API integration flow
11. Database relationships
12. MVP milestone roadmap
13. Scalable architecture
14. Production-ready planning
15. Supabase schema
16. Authentication design
17. State management approach
18. AI report generation flow
19. Social scanning pipeline
20. UX system

---

# Final Instruction

You are building the first version of a billion-dollar AI SaaS startup.

Do not produce vague ideas.

Provide:

* Technical planning
* System architecture
* Database design
* API structure
* UX flow
* UI hierarchy
* AI pipeline
* Frontend structure
* Backend architecture
* Scalability planning

Everything must be implementation-ready.

Think like:

**Stripe + Notion + HubSpot + AI Marketing Consultant**

Build this as a premium SaaS product.