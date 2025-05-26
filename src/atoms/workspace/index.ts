import {atomWithStorage} from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DEFAULT_WORKSPACE_ID, STORAGE_KEY, WorkspaceState} from './types';

// 기본 상태 정의 (초기화되지 않은 상태)
export const defaultState: WorkspaceState = {
  workspaceId: DEFAULT_WORKSPACE_ID,
  rootDirId: DEFAULT_WORKSPACE_ID,
  isAdmin: false,
  isValidWorkspace: false,
  isInitialized: false, // 초기에는 false로 설정
};

// AsyncStorage와 연동된 atom 생성
export const workspaceState = atomWithStorage<WorkspaceState>(
  STORAGE_KEY,
  defaultState,
  {
    getItem: async key => {
      try {
        console.log('조회할 키:', key);
        const savedData = await AsyncStorage.getItem(key);
        console.log('저장된 데이터:', savedData);
        if (savedData && savedData !== '{}') {
          console.log('저장되어있는 워크스페이스 정보 있음');
          const parsedData = JSON.parse(savedData);
          if (parsedData.workspaceId && parsedData.rootDirId) {
            console.log('저장되어있는 워크스페이스 정보 확실히 있음');

            return {
              workspaceId: parsedData.workspaceId,
              rootDirId: parsedData.rootDirId,
              isAdmin: parsedData.isAdmin,
              isValidWorkspace: parsedData.workspaceId !== DEFAULT_WORKSPACE_ID,
              isInitialized: true,
            };
          }
        } else {
          console.log('저장되어있는 워크스페이스 정보 없음');
        }
        return defaultState;
      } catch (error) {
        console.error('워크스페이스 정보 로드 실패:', error);
        return defaultState;
      }
    },
    setItem: async (key, value) => {
      try {
        const dataToStore = {
          workspaceId: value.workspaceId,
          rootDirId: value.rootDirId,
          isAdmin: value.isAdmin,
          isValidWorkspace: value.isValidWorkspace,
          isInitialized: value.isInitialized,
        };
        console.log('저장할 키:', key);
        console.log('저장할 데이터:', dataToStore);
        await AsyncStorage.setItem(key, JSON.stringify(dataToStore));
      } catch (error) {
        console.error('워크스페이스 정보 저장 실패:', error);
      }
    },
    removeItem: async key => {
      try {
        const exists = await AsyncStorage.getItem(key);
        if (exists) {
          await AsyncStorage.removeItem(key);
        }
      } catch (error) {
        console.error('워크스페이스 정보 삭제 실패:', error);
      }
    },
  },
);
