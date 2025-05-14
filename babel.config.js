module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // * 각 폴더 별 별칭 설정 * //
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
    // * 환경변수 설정을 위한 설정 추가 * //
    [
      'module:react-native-dotenv',
      {
        path: '.env',
        safe: true,
        allowUndefined: true,
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
