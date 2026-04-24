export const metadata = {
  title: 'Terms of Service',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
      <h1 className="text-display-md font-display font-bold text-content-primary mb-4">
        Terms of Service
      </h1>
      <p className="text-body-sm text-content-secondary mb-10">
        Last updated: January 2025
      </p>

      <div className="space-y-8">
        {[
          {
            title: '1. Acceptance of Terms',
            body: 'By accessing or using Social AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.',
          },
          {
            title: '2. Description of Service',
            body: 'Social AI provides AI-powered business intelligence for social media accounts. The service analyzes your connected social profiles and generates reports, recommendations, and growth roadmaps.',
          },
          {
            title: '3. User Accounts',
            body: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information during registration and to keep your information updated.',
          },
          {
            title: '4. Acceptable Use',
            body: 'You agree not to misuse the service, attempt to gain unauthorized access to other users’ data, or use the service to violate any applicable law. We reserve the right to terminate accounts that violate these terms.',
          },
          {
            title: '5. Beta Service',
            body: 'Social AI is currently in beta. The service is provided “as is” without warranty of any kind. Features may change, and service availability is not guaranteed during this period.',
          },
          {
            title: '6. Intellectual Property',
            body: 'The AI-generated reports and recommendations are provided for your personal business use. The underlying platform, algorithms, and design remain the property of Social AI.',
          },
          {
            title: '7. Limitation of Liability',
            body: 'Social AI is not liable for any indirect, incidental, or consequential damages arising from your use of the service. Business decisions made based on AI-generated reports are your sole responsibility.',
          },
          {
            title: '8. Contact',
            body: 'For questions about these Terms of Service, please contact us at legal@socialai.com.',
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
