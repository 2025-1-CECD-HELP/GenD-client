import React from 'react';
import {
  Container,
  SearchBarWrapper,
  EmptyView,
  FileList,
  ItemWrapper,
  columnWrapperStyle,
} from './index.style';
import {SearchBar} from '@/components/SearchBar';
import {FolderPreview} from '@/components/FolderPreview';
import {FilePreview} from '@/components/FilePreview';
import {FolderData} from '@/components/FolderPreview/index.type';
import {FileData} from '@/components/FilePreview/index.type';
import {useFile} from './hooks/useFile';

import CommonModal from '@/components/CommonModal';
import {useAddFileMutation} from './hooks/uesFileMutation';
import {useModal} from '@/contexts/modal/ModalContext';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

export const FileScreen: React.FC = () => {
  const [workspace] = useAtom(workspaceState);
  const {setIsOpen, setModalContent} = useModal();
  const {mutate: addFileMutation} = useAddFileMutation(
    workspace.workspaceId,
    parseInt(workspace.rootDirId, 10),
  );

  const {setSearch, mergedList, filteredFolders, filteredFiles} = useFile();

  return (
    <Container>
      <SearchBarWrapper>
        <SearchBar
          placeholder="이름으로 검색하세요"
          onSearchSubmit={setSearch}
          onPlusPress={() => {
            setIsOpen(true);
            setModalContent(
              <CommonModal
                type="input"
                title="폴더 추가하기"
                inputPlaceholder="폴더 이름을 입력하세요"
                onConfirm={inputValue => {
                  addFileMutation({
                    workspaceId: workspace.workspaceId,
                    parentId: parseInt(workspace.rootDirId, 10),
                    directoryName: inputValue!,
                  });
                }}
                onCancel={() => {
                  setIsOpen(false);
                }}
              />,
            );
          }}
        />
      </SearchBarWrapper>
      {filteredFolders.length === 0 && filteredFiles.length === 0 && (
        <EmptyView>폴더나 파일이 없습니다.</EmptyView>
      )}
      {/* <Breadcrumb>
        {breadcrumbs.map((name, idx) => (
          <View key={idx} style={{flexDirection: 'row', alignItems: 'center'}}>
            <BreadcrumbText>{name}</BreadcrumbText>
            {idx < breadcrumbs.length - 1 && (
              <BreadcrumbArrow>›</BreadcrumbArrow>
            )}
          </View>
        ))}
      </Breadcrumb> */}
      <FileList
        data={mergedList}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={columnWrapperStyle}
        renderItem={({item}) => {
          if ((item as {type: string}).type === 'folder') {
            return (
              <ItemWrapper>
                <FolderPreview
                  folder={item as FolderData}
                  isAdmin={workspace.isAdmin}
                />
              </ItemWrapper>
            );
          }
          return (
            <ItemWrapper>
              <FilePreview {...(item as FileData)} />
            </ItemWrapper>
          );
        }}
        keyExtractor={(item, index) =>
          `${item as FileData | FolderData}-${index}`
        }
      />
    </Container>
  );
};

export default FileScreen;
