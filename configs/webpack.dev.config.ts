import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin";
import NodemonPlugin from "nodemon-webpack-plugin";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import "webpack-dev-server";

import baseConfig from "./webpack.base.config";

const config: Configuration = {
  mode: "development",
  plugins: [new ForkTsCheckerPlugin(), new NodemonPlugin()],
};

export default merge(baseConfig, config);
