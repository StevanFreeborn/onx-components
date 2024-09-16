import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import analyze from 'rollup-plugin-analyzer';
import externalizePeerDeps from 'rollup-plugin-peer-deps-external';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import pkg from './package.json' with { type: 'json' };
import path from 'path';
import { readdirSync, statSync } from 'fs';

const plugins = [
  externalizePeerDeps(),
  resolve(),
  typescript({
    tsconfig: './tsconfig.rollup.json',
    useTsconfigDeclarationDir: true,
  }),
  commonjs(),
  analyze(),
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { scripts, devDependencies, ...rest } = pkg;

function getFolderPlugins(folderPath) {
  return [
    ...plugins,
    generatePackageJson({
      baseContents: {
        ...rest,
        name: folderPath.split('\\').slice(1).join('/'),
        private: true,
        main: path.relative(folderPath, pkg.main).replace(/\\/g, '/'),
        module: './index.js',
        types: './index.d.ts',
      },
    }),
  ];
}

function getFolders(dirPath, directories = []) {
  const items = readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);

    if (statSync(fullPath).isDirectory()) {
      directories.push(fullPath);
      getFolders(fullPath, directories);
    }
  }

  return directories;
}

const folderBuilds = getFolders('./src').map(folderPath => {
  const inputPath = path.join(folderPath, 'index.ts');

  const outputPathParts = folderPath.split('\\').slice(1);
  outputPathParts.unshift('dist');

  const outputFolderPath = outputPathParts.join('/');
  const outputPath = path.join(outputFolderPath, 'index.js');

  return {
    input: inputPath,
    output: [
      {
        file: outputPath,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: getFolderPlugins(folderPath),
  };
});

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: 'OnxComponents',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: plugins,
  },
  ...folderBuilds,
];
