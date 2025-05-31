// src/screens/file/hooks/useFile.ts
import {useState} from 'react';
// import {data} from '../constants/mockData';

import {useFileQuery} from './useFileQuery';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';
import {useAddFileMutation} from '@/screens/file/hooks/uesFileMutation';

// import {useFileQuery} from './useFileQuery';
/**
 * 파일 관리 페이지에 사용될 훅 입니다.
 * - 검색 기능 구현
 * - 폴더와 파일 데이터 필터링
 * - 폴더와 파일 데이터 병합
 * 이 훅에서 뮤테이션과 쿼리 함수를 사용합니다.
 * @author 홍규진
 */
const initialData = {
  directoryList: [],
  fileList: [],
};

export const useFile = () => {
  const [search, setSearch] = useState('');
  const [workspace, setWorkspace] = useAtom(workspaceState);

  // breadcrumb 스택: [{id, name}]
  const [breadcrumbStack, setBreadcrumbStack] = useState([
    {id: workspace.rootDirId, name: '최상위'},
  ]);

  const {data, refetch} = useFileQuery(
    workspace.workspaceId,
    parseInt(workspace.rootDirId, 10),
  );
  const {mutate: addFileMutation} = useAddFileMutation(
    workspace.workspaceId,
    parseInt(workspace.rootDirId, 10),
  );

  const safeData = data || initialData;

  const filteredFolders = safeData.directoryList.filter(folder =>
    folder.dirName.includes(search),
  );

  const filteredFiles = safeData.fileList.filter(file =>
    file.documentTitle.includes(search),
  );

  const mergedList = [
    ...filteredFolders.map(folder => ({...folder, type: 'folder'})),
    ...filteredFiles.map(file => ({...file, type: 'file'})),
  ];

  const handleClickFolder = (folderId: string, folderName: string) => {
    setWorkspace({...workspace, rootDirId: folderId});
    setBreadcrumbStack(prev => [...prev, {id: folderId, name: folderName}]);
    refetch();
    setSearch('');
  };

  // breadcrumb 클릭 시
  const handleClickBreadcrumb = (idx: number) => {
    const target = breadcrumbStack[idx];
    setWorkspace({...workspace, rootDirId: target.id});
    setBreadcrumbStack(breadcrumbStack.slice(0, idx + 1));
    refetch();
    setSearch('');
  };

  return {
    search,
    setSearch,
    mergedList,
    filteredFolders,
    filteredFiles,
    handleClickFolder,
    handleClickBreadcrumb,
    breadcrumbStack,
    addFileMutation,
  };
};
