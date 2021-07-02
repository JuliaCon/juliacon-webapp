const path = require("path");
const webpack = require("webpack");

const srcDir = path.join(process.cwd(), "src");

module.exports = {
  webpack: (config, { isServer, dev }) => {
    config.plugins.unshift(
      new webpack.DefinePlugin({
        __SERVER__: isServer,
        __DEV__: dev,
      })
    );

    // Because of reasons, Webpack doesn't seem to be able to properly eliminate
    // dead code that does dynamic imports within the project (i.e., it will
    // still try to bundle the dynamically imported code and inevitably fail
    // when it tries to load the `fs` module or something similar). Everything
    // in src/server is only used on the server side, so we can get around
    // this by just ignoring any server imports for the frontend bundle.
    if (!isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          /**
           *
           * @param r {string}
           * @param ctx {string}
           * @returns {boolean}
           */
          checkResource(r, ctx) {
            if (r.includes("server") && ctx.startsWith(srcDir)) {
              console.log(r, ctx);
              return true;
            }
            return false;
          },
        })
      );
    }
    return config;
  },
};
