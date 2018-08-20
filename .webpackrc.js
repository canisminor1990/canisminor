import cssnano from "cssnano";
import pxtorem from "postcss-pxtorem";
import vendor from "./src/vendor";

export default {
  entry              : {
    index : "./src/index.js",
    vendor: vendor
  },
  publicPath         : "/",
  disableCSSModules  : true,
  hash               : true,
  ignoreMomentLocale : true,
  sass               : {
    includePaths: ["node_modules", "src/style"]
  },
  html               : {
    "template": "./src/index.ejs"
  },
  define             : {
    "$dirname": __dirname,
    "$isDev"  : process.env.NODE_ENV === "development"
  },
  extraPostCSSPlugins: [
    pxtorem({
              rootValue    : 16,
              propList     : ["*"],
              minPixelValue: 2
            })
  ],
  extraBabelPlugins  : [
    "transform-decorators-legacy",
    "lodash",
  ],
  env                : {
    development: {
      proxy              : {
        '/v2': {
          target      : 'http://localhost:8200',
          changeOrigin: true,
          xfwd        : true,
          secure      : true
        }
      },
      extraBabelPlugins: [
        "dva-hmr",
        ["babel-plugin-styled-components", { displayName: true }]
      ]
    },
    production : {
      browserslist       : ["iOS >= 8", "Android >= 4"],
      commons            : [
        {
          name    : "vendor",
          filename: "vendor.[chunkhash].js"
        },
        {
          async: "common",
          children: true,
          minChunks: 2
        },
      ],
    }
  }
};

