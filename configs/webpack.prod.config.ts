import TerserPlugin from "terser-webpack-plugin";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import Webpackbar from "webpackbar";

import baseConfig from "./webpack.base.config";

const config: Configuration = {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          sourceMap: true,
          compress: false,
          keep_classnames: true,
          keep_fnames: true,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new Webpackbar({
      color: "deeppink",
    }),
  ],
};

export default merge(baseConfig, config);
