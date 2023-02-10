const slsw = require('serverless-webpack');

module.exports = {
  // entry: set by the plugin
  // output: set by the plugin
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  target: 'node18',
  externals: [
    /aws-sdk/, // Available on AWS Lambda
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-env", {
                "targets": {
                  "node": "18"
                }
              }]
            ]
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
};
