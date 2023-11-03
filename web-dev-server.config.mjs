// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

import { copy } from '@web/rollup-plugin-copy';

import css from 'rollup-plugin-import-css';

import { fromRollup } from '@web/dev-server-rollup';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: '/',
  watch: !hmr,
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  appIndex: './index.html',

  plugins: [
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),
    // Copy Shoelace assets to dist/shoelace
    fromRollup(copy)({
      copyOnce: true,
      targets: [
        {
          src: path.resolve(
            __dirname,
            'node_modules/@shoelace-style/shoelace/dist/assets'
          ),
          dest: path.resolve(__dirname, 'assets/shoelace'),
        },
      ],
    }),

    fromRollup(css)(),
  ],

  // See documentation for all available options
});
