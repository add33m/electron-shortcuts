module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.jsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        exclude: /node_modules/,
        presets: ['@babel/preset-react']
      }
    }
  },
  // ttf loader so that monaco works properly
  {
    test: /\.ttf$/,
    use: [
      {
        loader: 'ttf-loader',
        options: {
          name: './font/[hash].[ext]',
        },
      },
    ]
  },
  // font loader for fa
  // {
  //   test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
  //   use: [
  //     {
  //       loader: "file-loader",
  //     },
  //   ]
  // },

  
  // Put your webpack loader rules in this array.  This is where you would put
  // your ts-loader configuration for instance:
  /**
   * Typescript Example:
   *
   * {
   *   test: /\.tsx?$/,
   *   exclude: /(node_modules|.webpack)/,
   *   loaders: [{
   *     loader: 'ts-loader',
   *     options: {
   *       transpileOnly: true
   *     }
   *   }]
   * }
   */
];
