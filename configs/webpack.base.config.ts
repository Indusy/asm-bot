import path from "path";

import dotenv from "dotenv";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";

dotenv.config();

const isDevMode = process.env.NODE_ENV !== "production";

const config: Configuration = {
  entry: path.resolve(__dirname, "../src/main.ts"),
  stats: "errors-only",
  output: {
    clean: true,
    filename: "main.js",
    path: path.resolve(__dirname, "../dist"),
  },
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          happyPackMode: !isDevMode,
        },
      },
      {
        test: /\.(jpg|png)$/,
        type: "asset/inline",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin()],
  },
};

export default config;
