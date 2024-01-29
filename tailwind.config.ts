import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      width: {
        128: '32rem',
      },
    },
  },
  plugins: [require('daisyui')],
}

export default config
