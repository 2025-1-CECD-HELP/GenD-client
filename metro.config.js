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
  },
  resolver: {
    resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'], // Storybook 우선 로드
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs', 'mjs'], // 추가 확장자 지원
    assetExts: [...defaultConfig.resolver.assetExts], // 기본 자산 확장자 유지
    alias: {
      '@': path.resolve(__dirname, './src'), // @ 경로 별칭 추가 (src 폴더)
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
