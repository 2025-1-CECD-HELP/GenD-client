/**
 * 멤버 권한 타입 정의
 * 관리자와 일반 멤버, 그리고 아무 권한도 없는 none으로 나뉩니다.
 * ActiveMemberPosition의 경우 워크스페이스 멤버에 대한 권한 타입만 담습니다.
 * @author 이정선
 */

export type MemberPosition = 'member' | 'manager' | 'none';
