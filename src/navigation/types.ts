/**
 * 라우트 파라미터 타입을 정의합니다.
 * 라우트 파라미터는 라우트 경로에 전달되는 파라미터를 나타냅니다.
 * 이는 향후에 useRouter 훅을 사용할 때 라우트 이름과 함께 전달됩니다.
 * @author 홍규진
 * ex) const router = useRouter();
 * router.push(ROUTE_NAMES.SEARCH, { searchQuery: 'test' });
 */

export type TRouteParams = {
  LANDING: {};
  HOME: {};
  FILE: {};
  CALENDAR: {};
  MYPAGE: {};
  LOGIN: {};
  MEETING: {};
  WRITE: {};
  MEMBER: {};
  POST_DETAIL: {postId: number};
  RECORDING: {templateId: string};
  INIT_WORKSPACE: {};
  CREATE_WORKSPACE: {};
};
