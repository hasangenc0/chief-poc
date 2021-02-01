import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.BUILD === 'production';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'iife',
            sourcemap: !isProduction,
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: !isProduction,
        },
    ],
    plugins: [
        peerDepsExternal(),
        typescript({ useTsconfigDeclarationDir: true }),
        isProduction && terser(),
    ]
};
