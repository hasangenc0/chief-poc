import serve from "rollup-plugin-serve";

export default () => serve({
    open: true,
    // Show server address in console (default: true)
    verbose: true,
    contentBase: ['dist', 'static'],
    historyApiFallback: false,
    // Options used in setting up server
    host: 'localhost',
    port: 6161,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    mimeTypes: {
        'application/javascript': ['js_commonjs-proxy']
    }
});
