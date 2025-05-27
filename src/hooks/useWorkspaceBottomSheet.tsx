import {useAtom} from 'jotai';

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
        workspaceList={workspaceList || []}
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
