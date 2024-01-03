const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const { ModuleFederationTypesPlugin } = require("@cloudbeds/webpack-module-federation-types-plugin");

const federationConfig = {
  name: "admin",
  filename: "remoteEntry.js",
  remotes: {
    container: "container@http://localhost:5500/dist/remoteEntry.js",
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      eager: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
};

module.exports = {
  entry: "/src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js",
    chunkFilename: "[id].[contenthash:8].chunk.js",
    clean: true,
  },
  devServer: {
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", "scss", "json"],
    plugins: [
      new TsconfigPathsPlugin({}), //default tsconfig.json
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html"),
    }),
    new ModuleFederationPlugin(federationConfig),
    new ModuleFederationTypesPlugin({
      downloadTypesWhenIdleIntervalInSeconds: 120,
    }),
    new Dotenv({ path: path.resolve(__dirname, "./.env") }),
  ],
};