import {atom} from 'jotai';
import {TGetUserResponse} from '@/services/auth/types';
/**
 * 유저의 정보를 저장하는 상태입니다.
 * 유저의 아이디, 이름, 이메일, 로그인 프로바이더를 저장합니다.
 * 로그인 프로바이더는 소셜 로그인 시 사용됩니다.
 * @author 홍규진
 */
export const defaultState: TGetUserResponse = {
  memberId: 0,
  memberName: 'Guest',
  loginProvider: 'GUEST',
  memberEmail: 'guest@example.com',
};

export const userState = atom<TGetUserResponse | null>(defaultState);
