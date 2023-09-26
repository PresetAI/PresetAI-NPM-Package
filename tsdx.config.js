const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        inject: false,     // Ensures CSS isn't injected into the JavaScript bundle
        extract: true,     // Always extract CSS to a separate file
        modules: false,    // If you want to use CSS modules, set this to true
        plugins: [],
      })
    );

    // Adjust output paths (if you still want this customization)
    if (options.format === 'esm') {
      config.output.file = 'dist/index.esm.js';
    } else if (options.format === 'cjs') {
      config.output.file = 'dist/index.js';
    }

    return config;
  },
};
