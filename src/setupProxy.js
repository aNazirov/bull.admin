const { createProxyMiddleware } = require("http-proxy-middleware");

const pathRewrite = function (path, req) {
  const [__, root, fileName, token] = path.split("/");

  req.headers.Authorization = `Bearer ${token}`;

  return `${root}/${fileName}`;
};

module.exports = function (app) {
  app.use(
    "/file",
    createProxyMiddleware({
      target: process.env.REACT_APP_API_HOST,
      pathRewrite,
      changeOrigin: true,
    })
  );
};
