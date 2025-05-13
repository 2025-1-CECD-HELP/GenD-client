module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@contexts': './src/contexts',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@styles': './src/styles',
          '@theme': './src/theme',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_SERVER_URL',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
