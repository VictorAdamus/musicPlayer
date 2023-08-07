/** @type {import('tailwindcss').Config} */
module.exports = {
  module: {
    rules: [
      {
        test: /\.mp3$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'audio/'
          }
        }
      }
    ]
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'rte': {'max': '768px'}, 
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        lazySpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        upDown: {
          '0%': {height: '0'},
          '100%': {height: '340px'}
        }
      },
      animation: {
        wiggle: 'wiggle 10s linear infinite',
        lazySpin: 'lazySpin 1.7s linear infinite',
        upDown1: 'upDown 0.7s ease-in-out 1.3s infinite alternate',
        upDown2: 'upDown 0.6s linear 0.5s infinite alternate',
        upDown3: 'upDown 0.9s ease 1s infinite alternate',
        upDown4: 'upDown 0.3s ease-in 1.5s infinite alternate',
        upDown5: 'upDown 0.4s ease-out 0.5s infinite alternate'
      },
    },
  },
  plugins: [],
}
