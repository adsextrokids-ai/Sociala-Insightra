/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#070810',
          1: '#0C0E1B',
          2: '#11142A',
          3: '#181C36',
        },
        edge: {
          subtle: '#1A1E34',
          DEFAULT: '#252C48',
          bright:  '#323C60',
        },
        brand: {
          violet:  '#8B5CF6',
          violet2: '#A78BFA',
          gold:    '#F59E0B',
          gold2:   '#FCD34D',
          cyan:    '#22D3EE',
        },
        ok:   '#10B981',
        warn: '#F59E0B',
        bad:  '#F43F5E',
        ink: {
          bright:  '#F0F4FF',
          DEFAULT: '#B8C4D8',
          muted:   '#5A6785',
          ghost:   '#4A5580',   // light enough to be visible on dark surfaces
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)',     'system-ui', 'sans-serif'],
        display: ['var(--font-bricolage)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4.5rem',   { lineHeight: '0.95',  letterSpacing: '-0.03em',  fontWeight: '800' }],
        'h1':   ['3.25rem',  { lineHeight: '1.05',  letterSpacing: '-0.025em', fontWeight: '700' }],
        'h2':   ['2.25rem',  { lineHeight: '1.1',   letterSpacing: '-0.02em',  fontWeight: '600' }],
        'h3':   ['1.5rem',   { lineHeight: '1.25',  letterSpacing: '-0.01em',  fontWeight: '600' }],
        'lead': ['1.125rem', { lineHeight: '1.7' }],
        'base': ['1rem',     { lineHeight: '1.65' }],
        'sm':   ['0.875rem', { lineHeight: '1.5' }],
        'xs':   ['0.75rem',  { lineHeight: '1.4',   letterSpacing: '0.03em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '28': '7rem',
      },
      borderRadius: {
        'card': '0.875rem',
        'pill': '9999px',
      },
      boxShadow: {
        'glow':       '0 0 60px -20px rgba(139, 92, 246, 0.35)',
        'glow-gold':  '0 0 40px -15px rgba(245, 158, 11, 0.25)',
        'card':       '0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      // NOTE: only backgroundImage here — no backgroundSize key named 'grid'
      // (would conflict and override the image class with a size-only class)
      backgroundImage: {
        'dot-grid': [
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        ].join(', '),
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' },                                 to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' },  to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
