export default {
    input: 'index.js',
    output: [{
        file: 'dist/appcacher-iife.js',
        format: 'iife',
        name: 'idbKeyval'
    }, {
        file: 'dist/appcacher-cjs.js',
        format: 'cjs'
    }, {
        file: 'dist/appcacher.mjs',
        format: 'es'
    }, {
        file: 'dist/appcacher-amd.js',
        format: 'amd',
    }]
};