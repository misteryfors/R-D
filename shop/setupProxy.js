const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            secure: true,
            target: 'https://master43.ru',
            changeOrigin: true,
            followRedirects: true
        })
    );
};