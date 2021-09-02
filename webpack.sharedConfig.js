module.exports = (config = {}) => {
  config.module.rules.push({
    test: /\.svg$/,
    issuer: /\.(ts)x?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          memo: true,
          replaceAttrValues: {
            '#000000': 'currentcolor',
            '#000': 'currentcolor',
          },
          svgoConfig: {
            plugins: [
              {
                // cleanupIDs: false,
                addAttributesToSVGElement: {
                  attributes: ['preserveAspectRatio="xMidYMid meet"'],
                },
              },
            ],
          },
        },
      },
      'url-loader',
    ],
  })

  return config
}
