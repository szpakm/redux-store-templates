const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    main: ["./src/index.tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: [
                "@babel/react",
                "@babel/typescript"
                /*
                      No transpilation in dev.
                      With current configuration, the modest browser
                      should handle every code feature.
                      Use @babel/env if needed
                    */
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                [
                  "emotion",
                  {
                    autoLabel: true,
                    labelFormat: "[local]",
                    sourceMap: true
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js"],
    alias: {
      // some plugins may import "babel-core" wheras the newest version is in monorepo @babel/core
      "babel-core": path.resolve(
        path.join(__dirname, "../node_modules/@babel/core")
      )
    }
  },
  plugins: []
};
