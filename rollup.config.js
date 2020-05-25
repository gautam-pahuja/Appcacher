export default {
    input: 'index.js',
    output: [{
        file: 'dist/appcacher-iife.js',
        format: 'iife',
        name: 'appcacher'
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