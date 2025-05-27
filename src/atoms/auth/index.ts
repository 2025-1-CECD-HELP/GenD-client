import {atom} from 'jotai';
import EncryptedStorage from 'react-native-encrypted-storage';
import {navigate, replace} from '@/navigation/navigator';
import {ROUTE_NAMES} from '@/constants/routes';

// 상태 atoms
export const isSignedInAtom = atom<boolean>(false);
export const isLoadingAtom = atom<boolean>(true);

// 액션 atoms
export const checkAuthStateAtom = atom(null, async (get, set) => {
  try {
    set(isLoadingAtom, true);
    const token = await EncryptedStorage.getItem('accessToken');
    set(isSignedInAtom, !!token);
  } catch (error) {
    console.error('인증 상태 확인 실패:', error);
    throw error;
  } finally {
    set(isLoadingAtom, false);
  }
});

export const signOutAtom = atom(null, async (get, set) => {
  try {
    const token = await EncryptedStorage.getItem('accessToken');
    if (token) {
      await EncryptedStorage.removeItem('accessToken');
    }
    set(isSignedInAtom, false);
    replace(ROUTE_NAMES.LOGIN, {});
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
});

export const resetAuthStateAtom = atom(null, async (get, set) => {
  try {
    set(isLoadingAtom, true);
    if (await EncryptedStorage.getItem('accessToken')) {
      await EncryptedStorage.removeItem('accessToken');
    }
    if (await EncryptedStorage.getItem('refreshToken')) {
      await EncryptedStorage.removeItem('refreshToken');
    }
    set(isSignedInAtom, false);

    // 네비게이션도 여기서 처리
    navigate(ROUTE_NAMES.LOGIN, {});

    console.log('인증 상태가 초기화되었습니다.');
  } catch (error) {
    console.error('인증 상태 초기화 실패:', error);
    throw error;
  } finally {
    set(isLoadingAtom, false);
  }
});

// 초기화를 위한 atom
export const initializeAuthAtom = atom(null, async (get, set) => {
  await set(checkAuthStateAtom);
});
