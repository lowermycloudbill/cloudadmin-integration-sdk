const typescript = require('rollup-plugin-typescript');
import { nodeResolve } from '@rollup/plugin-node-resolve';

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'build/dist/cloudadmin-iframe-api.js',
      format: 'cjs',
    },
  ],
  plugins: [
    typescript(),
    nodeResolve()
  ],
};
