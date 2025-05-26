const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

/**----------------------------------------------------------------------
 * Metro 설정을 위한 Default 설정들만 따로 모듈화 합니다.
 * @author 홍규진
 */
const defaultConfig = getDefaultConfig(__dirname);

/** ----------------------------------------------------------------------
 * 프로젝트 설정을 위한 설정들만 따로 모듈화 합니다.
 * @author 홍규진
 */
const projectConfig = {
  transformer: {
    unstable_allowRequireContext: true, // require.context 지원 활성화 (Storybook에서 필요)
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    // 캐싱 최적화를 위한 설정
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // 성능 향상을 위한 인라인 require
      },
    }),
  },

  resolver: {
    resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'], // Storybook 우선 로드
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs', 'mjs', 'svg'], // 추가 확장자 지원
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'), // svg 확장자 제외
    alias: {
      '@': path.resolve(__dirname, './src'), // @ 경로 별칭 추가 (src 폴더)
    },
  },
  // 프로덕션 빌드 최적화
  serializer: {
    getModulesRunBeforeMainModule: () => [
      require.resolve('react-native/Libraries/Core/InitializeCore'),
    ],
    // 번들 크기 최적화
    createModuleIdFactory: () => path => {
      // 모듈 ID를 숫자로 변환하여 번들 크기 최적화
      return path.replace(__dirname, '').replace(/[^a-zA-Z0-9]/g, '');
    },
  },
};

const finalConfig = mergeConfig(defaultConfig, projectConfig);

/**----------------------------------------------------------------------
 * Storybook 설정을 위한 설정들만 따로 모듈화 합니다.
 * @author 홍규진
 */
const storybookConfig = {
  enabled: true,
  // Path to your storybook config
  configPath: path.resolve(__dirname, './.storybook'),
};

module.exports = (async () => {
  return withStorybook(finalConfig, storybookConfig);
})();
