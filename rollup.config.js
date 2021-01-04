import babel from '@rollup/plugin-babel';

const config = {
  input: 'src/index.js',
  output: [
    {
      format: 'esm',
      file: 'dist/user.esm.js',
    },
    {
      format: 'cjs',
      file: 'dist/user.cjs.js',
    },
  ],
  plugins: [babel({ babelHelpers: 'runtime' })],
  external: [/@babel\/runtime/, '@alexbainter/indexed-db'],
};

export default config;
