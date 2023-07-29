/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'space-mono': ['Space Mono', 'monospace'],
      },
      colors: {
        'primary-300': 'hsl(185, 41%, 84%)',
        'primary-400': 'hsl(173, 61%, 77%)',
        'primary-500': 'hsl(172, 67%, 45%)',
        'primary-600': 'hsl(183, 78%, 24%)',
        'primary-700': 'hsl(183, 100%, 15%)',
        'neutral-100': 'hsl(0, 0%, 100%)',
        'neutral-200': 'hsl(189, 41%, 97%)',
        'neutral-500': 'hsl(184, 14%, 56%)',
        'neutral-600': 'hsl(180, 18%, 40%)',
        'neutral-700': 'hsl(186, 14%, 43%)',
      },
      screens: {
        sm: '550px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '980px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        'min-screen': {
          raw: '(min-width: 980px) and (min-height: 860px)',
        },
      },
    },
  },
  plugins: [],
}
