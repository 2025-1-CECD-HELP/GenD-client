import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useBottomSheet} from '../bottomSheet/BottomSheetContext';
import {useWorkspaceListQuery} from '@/screens/home/hooks/useWorkspaceQuery';
import {WorkspaceBottomSheet} from '@/components/WorkspaceBottomSheet';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';

/**
 * 현재 관리중인 워크스페이스 정보를 관리합니다.
 * 워크스페이스 정보는 워크스페이스 목록 조회 후 선택된 워크스페이스 정보를 저장합니다.
 * @author 홍규진
 */

export interface WorkspaceContextType {
  workspaceId: string | null;
  setWorkspaceId: (workspaceId: string | null) => void;
  handleOpenBottomSheet: () => void;
}

const STORAGE_KEY = 'workspaceId';

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

export const WorkspaceProvider = ({children}: {children: React.ReactNode}) => {
  const [workspaceIdState, setWorkspaceIdState] = useState<string | null>(null);
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();
  const {data: workspaceList} = useWorkspaceListQuery();
  const navigation = useTypeSafeNavigation();
  // 저장 함수
  const setWorkspaceId = useCallback(
    async (id: string | null) => {
      setWorkspaceIdState(id);
      await AsyncStorage.setItem(STORAGE_KEY, String(id));
      navigation.navigate('LANDING', {});
      closeBottomSheet();
    },
    [closeBottomSheet, navigation],
  );

  // 앱 시작 시 저장된 값 불러오기
  useEffect(() => {
    (async () => {
      const savedId = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedId) {
        setWorkspaceIdState(savedId);
      } else {
        setWorkspaceIdState(null);
      }
    })();
  }, [workspaceIdState]);

  function handleOpenBottomSheet() {
    openBottomSheet(
      <WorkspaceBottomSheet
        workspaceList={workspaceList}
        onSelect={setWorkspaceId}
        onAdd={() => {
          navigation.navigate('INIT_WORKSPACE', {});
          closeBottomSheet();
        }}
      />,
    );
  }
  return (
    <WorkspaceContext.Provider
      value={{
        workspaceId: workspaceIdState,
        setWorkspaceId,
        handleOpenBottomSheet,
      }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

// 워크스페이스 컨텍스트 사용을 위한 커스텀 훅
export const useWorkspace = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
