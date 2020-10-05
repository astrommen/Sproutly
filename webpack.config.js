module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
}