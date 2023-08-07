/** @type {import('next').NextConfig} */
module.exports = {
    webpack(config) {
      config.module.rules.push({
        test: /\.(mp3)$/,
        use: {
          loader: 'raw-loader',
          options: {
            esModule: false,
          },
        },
      });
  
      return config;
    },
  };
  