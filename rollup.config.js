import babel from '@rollup/plugin-babel';

const fullConfig = {
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
  external: [/@babel\/runtime/, '@alexbainter/indexed-db', 'redux'],
};

const userDataReducerConfig = {
  input: 'src/user-data-reducer.js',
  output: [
    {
      format: 'cjs',
      file: 'dist/user-data-reducer.js',
      exports: 'default',
    },
  ],
  plugins: [],
  external: ['redux'],
};

export default [fullConfig, userDataReducerConfig];
