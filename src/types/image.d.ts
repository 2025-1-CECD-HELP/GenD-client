/**
 * 이미지 관련 파일들에 대한 타입 정의를 위해 사용되는 파일입니다.
 * 이 파일은 TypeScript에게 이미지 파일을 모듈로 인식하도록 합니다.
 * 이렇게 하면 이미지 파일을 import할 때 타입 오류를 방지할 수 있습니다.
 * 예를 들어, import image from './image.png'와 같은 구문을 사용할 수 있습니다.
 * @author 홍규진
 */

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
