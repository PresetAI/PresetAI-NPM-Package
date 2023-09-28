const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        inject: false, // Don't inject styles into JavaScript
        extract: true, // Extract to a separate CSS file
        modules: false, // Change to true if you want CSS modules
        plugins: [autoprefixer()],
        sourceMap: true, // Add source maps
      })
    );

    // Adjust output paths
    if (options.format === 'esm') {
      config.output.file = 'dist/index.esm.js';
    } else if (options.format === 'cjs') {
      config.output.file = 'dist/index.js';
    }

    return config;
  },
};
