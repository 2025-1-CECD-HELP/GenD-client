/**
 * 라우트 이름들을 정의합니다.
 * 라우트 이름은 라우트 경로를 나타내는 문자열이며 대문자로만 작성합니다.
 * as const는 TypeScript에서 객체를 읽기 전용 리터럴 타입으로 만드는 역할을 합니다.
 * 라우트 이름이 실수로 변경되는 것을 방지합니다.
 * 이는 향후에 useRouter 훅을 사용할 때 라우트 이름을 사용하며, param과 함께 전달합니다.
 * ex) const navigation = useTypeSafeNavigation();
 * navigation.navigate(ROUTE_NAMES.HOME);
 * @author 홍규진
 */

export const ROUTE_NAMES = {
  LANDING: 'LANDING',
  HOME: 'HOME',
  SEARCH: 'SEARCH',
  LOGIN: 'LOGIN',
  WRITE: 'WRITE',
} as const;
