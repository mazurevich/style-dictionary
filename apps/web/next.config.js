const withTM = require("next-transpile-modules")(["dls"]);

module.exports = withTM({
  reactStrictMode: true,
});
