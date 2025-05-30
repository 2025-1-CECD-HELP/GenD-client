import {atom} from 'jotai';
import {TGetUserResponse} from '@/services/auth/types';

// 기본 상태 정의 (초기화되지 않은 상태)
export const defaultState: TGetUserResponse = {
  memberId: 0,
  memberName: 'Guest',
  loginProvider: 'GUEST',
  memberEmail: 'guest@example.com',
};

export const userState = atom<TGetUserResponse | null>(defaultState);
