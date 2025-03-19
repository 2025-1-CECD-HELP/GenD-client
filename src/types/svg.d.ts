/**
 * SVG 파일을 모듈로 가져오기 위한 타입 정의
 * SVG 파일을 가져올 때, react native svg를 통해서 Component 형태로 가져올 수 있도록 합니다.
 * 예시) import {HomeIcon} from '@assets/images/svg/bottom-navigator/home.svg';
 * 이를 위해서는 metro.config.js 파일에 설정이 필요합니다.
 * @author 홍규진
 */
declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
