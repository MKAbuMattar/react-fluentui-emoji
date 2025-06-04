const {v4: uuid} = require('uuid');

/** @type {import('svgo').Config} */
const svgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    'convertStyleToAttrs',
    'cleanupIds',
    {
      name: 'prefixIds',
      params: {
        delim: '',
        prefix: () => `svg-${uuid()}-`,
      },
    },
    'removeDimensions',
  ],
};

module.exports = svgoConfig;
