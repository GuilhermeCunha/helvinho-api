module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    '@babel/plugin-transform-runtime',
    ['module-resolver', {
      // "root": ["./src"],
      alias: {
        '@entities': './src/database/entity',
        '@controllers': './src/controllers',
        '@utils': './src/utils',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
