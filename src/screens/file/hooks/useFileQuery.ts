import {fileQuery} from '@/constants/queryKeys';
import {useSuspenseQuery} from '@tanstack/react-query';

/**
 * 파일 목록 조회 훅
 * @param workspaceId 워크스페이스 ID
 * @returns 파일 목록
 * @author 홍규진
 */

export const useFileQuery = (workspaceId: string, dirId: number) => {
  const {data} = useSuspenseQuery({
    queryKey: fileQuery(workspaceId, dirId).queryKey,
    queryFn: fileQuery(workspaceId, dirId).queryFn,
  });

  return {
    data,
  };
};
