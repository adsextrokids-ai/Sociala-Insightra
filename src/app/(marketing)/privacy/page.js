export const metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
      <h1 className="text-display-md font-display font-bold text-content-primary mb-4">
        Privacy Policy
      </h1>
      <p className="text-body-sm text-content-secondary mb-10">
        Last updated: January 2025
      </p>

      <div className="prose prose-gray max-w-none space-y-8">
        {[
          {
            title: '1. Information We Collect',
            body: 'We collect information you provide directly to us, including your name, email address, and business information entered during onboarding. We also collect data from social media platforms you choose to connect, including profile data, post metrics, and engagement statistics.',
          },
          {
            title: '2. How We Use Your Information',
            body: 'We use the information we collect to provide, maintain, and improve our services, generate AI-powered business intelligence reports, and communicate with you about your account. We do not sell your personal information to third parties.',
          },
          {
            title: '3. Data Storage and Security',
            body: 'Your data is stored securely using industry-standard encryption. We use Supabase for database hosting and implement row-level security to ensure your data is only accessible by you.',
          },
          {
            title: '4. Social Media Data',
            body: 'When you connect a social media account, we access only the data necessary to generate your business report. We store OAuth access tokens securely and do not post on your behalf without explicit permission.',
          },
          {
            title: '5. Your Rights',
            body: 'You may request deletion of your account and associated data at any time by contacting us. You may also disconnect social accounts from within your account settings.',
          },
          {
            title: '6. Contact',
            body: 'If you have questions about this Privacy Policy, please contact us at privacy@socialai.com.',
          },
        ].map(({ title, body }) => (
          <section key={title}>
            <h2 className="text-lg font-display font-semibold text-content-primary mb-3">
              {title}
            </h2>
            <p className="text-body-md text-content-secondary leading-relaxed">{body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
