const path = require('path')
const sharedConfig = require('../webpack.sharedConfig.js')

module.exports = ({ config }) => {
  const fileLoaderRule = config.module.rules.find((rule) =>
    rule.test.test('.svg'),
  )
  fileLoaderRule.exclude = path.resolve(__dirname, '../')

  config.module.rules.push({
    test: /stories\.(ts|tsx)?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  })

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
  })

  config.resolve.extensions.push('.ts', '.tsx', '.svg')
  return {
    ...config,
    ...sharedConfig(config),
  }
}
