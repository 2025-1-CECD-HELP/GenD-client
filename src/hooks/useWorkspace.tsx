import {useAtom} from 'jotai';
import {useEffect} from 'react';

import {useBottomSheet} from '@/contexts/bottomSheet/BottomSheetContext';
import {useWorkspaceListQuery} from '@/screens/home/hooks/useWorkspaceQuery';
import {WorkspaceBottomSheet} from '@/components/WorkspaceBottomSheet';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {useQueryClient} from '@tanstack/react-query';
import {postQuery} from '@/constants/queryKeys';
import {workspaceState} from '@/atoms/workspace';
import {TWorkspace} from '@/services/workspace/types';

/**
 * 워크스페이스 바텀시트 관리 훅
 * 워크스페이스 선택 및 생성 기능을 제공합니다.
 */
export const useWorkspaceBottomSheet = () => {
  const [workspace, setWorkspace] = useAtom(workspaceState);
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();
  const {data: workspaceList} = useWorkspaceListQuery();
  const queryClient = useQueryClient();
  const navigation = useTypeSafeNavigation();

  const setWorkspaceInfo = (workspaceInfo: TWorkspace) => {
    setWorkspace(prev => ({
      ...prev,
      workspaceId: workspaceInfo.workspaceId,
      rootDirId: workspaceInfo.rootDirId,
      isValidWorkspace: true,
      isAdmin: workspaceInfo.workspaceRole === 'eAdmin',
      isInitialized: true,
    }));

    queryClient.invalidateQueries({
      queryKey: postQuery(workspace.workspaceId).queryKey,
    });
    closeBottomSheet();
    navigation.replace('LANDING', {});
  };

  const handleOpenBottomSheet = () => {
    openBottomSheet(
      <WorkspaceBottomSheet
        workspaceList={workspaceList}
        onSelect={setWorkspaceInfo}
        onAdd={() => {
          navigation.replace('INIT_WORKSPACE', {});
          closeBottomSheet();
        }}
      />,
    );
  };

  return {
    handleOpenBottomSheet,
  };
};

/**
 * 워크스페이스 정보 관리 훅
 * 유저 상태관리는 jotai 로 관리하고, 워크스페이스 정보는 AsyncStorage 에 저장합니다.
 * 워크스페이스 정보는 초기화 되어있지 않으면 초기화 상태로 설정합니다.
 * @author 홍규진
 */
export const useWorkspace = () => {
  const [workspace] = useAtom(workspaceState);

  return {
    workspace,
    rootDirId: workspace.rootDirId,
    workspaceId: workspace.workspaceId,
    isValidWorkspace: workspace.isValidWorkspace,
  };
};

/**
 * 워크스페이스 초기화 상태 체크 훅
 * 최초 접속 시 LANDING으로 이동하고, 워크스페이스가 없을 때만 INIT_WORKSPACE로 이동합니다.
 * @param isInit - true: INIT_WORKSPACE 화면에서 호출, false: LANDING 화면에서 호출
 */
export const useWorkspaceInit = (isInit: boolean) => {
  const [workspace] = useAtom(workspaceState);
  const navigation = useTypeSafeNavigation();
  console.log('workspace', workspace);
  useEffect(() => {
    //유효하지 않으면 보내고, 유효하면 초기화 상태 체크후 보내기
    if (workspace.isValidWorkspace && isInit) {
      navigation.replace('LANDING', {});
    }
  }, [navigation, workspace.isValidWorkspace, isInit]);

  return workspace;
};
