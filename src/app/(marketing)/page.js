import HeroSection from '@/components/marketing/HeroSection'
import StatsRow from '@/components/marketing/StatsRow'
import FeaturesSection from '@/components/marketing/FeaturesSection'
import HowItWorksSection from '@/components/marketing/HowItWorksSection'
import TestimonialsSection from '@/components/marketing/TestimonialsSection'
import PricingSection from '@/components/marketing/PricingSection'
import CtaBanner from '@/components/marketing/CtaBanner'

export const metadata = {
  title: 'Social AI — AI Business Growth & Social Intelligence',
  description:
    'Connect your social accounts. Get an AI-powered audit of your brand, content, and growth — in 60 seconds.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsRow />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaBanner />
    </>
  )
}
