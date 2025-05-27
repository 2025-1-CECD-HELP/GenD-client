// src/screens/file/hooks/useFile.ts
import {useState} from 'react';
// import {data} from '../constants/mockData';

import {useFileQuery} from './useFileQuery';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

// import {useFileQuery} from './useFileQuery';
/**
 * 파일 관리 페이지에 사용될 훅 입니다.
 * - 검색 기능 구현
 * - 폴더와 파일 데이터 필터링
 * - 폴더와 파일 데이터 병합
 * 이 훅에서 뮤테이션과 쿼리 함수를 사용합니다.
 * @author 홍규진
 */
export const useFile = () => {
  const [search, setSearch] = useState('');
  const [workspace] = useAtom(workspaceState);
  const {data} = useFileQuery(
    workspace.workspaceId,
    parseInt(workspace.rootDirId, 10),
  );
  const filteredFolders = data.directoryList.filter(folder =>
    folder.dirName.includes(search),
  );

  const filteredFiles = data.fileList.filter(file =>
    file.documentTitle.includes(search),
  );

  const mergedList = [
    ...filteredFolders.map(folder => ({...folder, type: 'folder'})),
    ...filteredFiles.map(file => ({...file, type: 'file'})),
  ];

  return {
    search,
    setSearch,
    mergedList,
    filteredFolders,
    filteredFiles,
  };
};
