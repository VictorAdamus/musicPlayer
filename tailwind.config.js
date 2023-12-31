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
      boxShadow: {
        'police': '10px 0px 20px 0px red, -10px 0px 20px 0px blue'
      },
      gradientColorStops: {
        'my-gradient': {
          'circle': 'rgba(12,12,15,1) 10%',
          '22': 'rgba(44,37,84,1) 22%',
          '33': 'rgba(54,24,91,1) 33%',
          '44': 'rgba(84,28,98,1) 44%',
          '60': 'rgba(64,17,80,1) 60%',
        },

      },
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
          '100%': {height: '40px'}
        },
        colorPulseRed: {
          '0%': {boxShadow: '0 0 0 0 rgba(255, 0, 0, 0.4)'},
          '50%': {boxShadow: '0 0 40px 20px rgba(145, 1, 1, 1)'},
          '100%': {boxShadow: '0 0 0 0 rgba(255, 0, 0, 0.4)'}
        },
        colorPulseBlue: {
          '0%': {boxShadow: '0 0 0 0 rgba(255, 0, 0, 0.4)'},
          '50%': {boxShadow: '0 0 40px 20px rgba(0, 60, 240, 1)'},
          '100%': {boxShadow: '0 0 0 0 rgba(255, 0, 0, 0.4)'}
        }
      },
      animation: {
        wiggle: 'wiggle 10s linear infinite',
        lazySpin: 'lazySpin 1.7s linear infinite',
        upDown1: 'upDown 0.7s ease-in-out 1.3s infinite alternate',
        upDown2: 'upDown 0.6s linear 0.5s infinite alternate',
        upDown3: 'upDown 0.9s ease 1s infinite alternate',
        upDown4: 'upDown 0.3s ease-in 1.5s infinite alternate',
        upDown5: 'upDown 0.4s ease-out 0.5s infinite alternate',
        colorPulseRed: 'colorPulseRed .8s ease infinite',
        colorPulseBlue: 'colorPulseBlue .8s ease .4s infinite'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
