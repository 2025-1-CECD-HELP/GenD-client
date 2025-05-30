import React from 'react';
import {
  Container,
  SearchBarWrapper,
  EmptyView,
  FileList,
  ItemWrapper,
  columnWrapperStyle,
  Breadcrumb,
  BreadcrumbText,
  BreadcrumbArrow,
  BreadcrumbItem,
} from './index.style';
import {SearchBar} from '@/components/SearchBar';
import {FolderPreview} from '@/components/FolderPreview';
import {FilePreview} from '@/components/FilePreview';
import {FolderData} from '@/components/FolderPreview/index.type';
import {FileData} from '@/components/FilePreview/index.type';
import {useFile} from './hooks/useFile';
import CommonModal from '@/components/CommonModal';
import {useModal} from '@/contexts/modal/ModalContext';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';
import {ActivityIndicator} from 'react-native';

export const FileScreen: React.FC = () => {
  const [workspace] = useAtom(workspaceState);
  const {setIsOpen, setModalContent} = useModal();
  const {
    setSearch,
    mergedList,
    filteredFolders,
    filteredFiles,
    handleClickFolder,
    addFileMutation,
    breadcrumbStack,
    handleClickBreadcrumb,
  } = useFile();

  if (!mergedList) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

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
      <Breadcrumb>
        {breadcrumbStack.map(({name}, idx) => (
          <BreadcrumbItem
            key={idx}
            onTouchEnd={() => handleClickBreadcrumb(idx)}>
            <BreadcrumbText>{name}</BreadcrumbText>
            {idx < breadcrumbStack.length - 1 && (
              <BreadcrumbArrow>›</BreadcrumbArrow>
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      {filteredFolders.length > 0 || filteredFiles.length > 0 ? (
        <FileList
          data={mergedList}
          numColumns={2}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          columnWrapperStyle={columnWrapperStyle}
          renderItem={({item}: {item: FileData | FolderData}) => {
            if ('dirId' in item) {
              return (
                <ItemWrapper>
                  <FolderPreview
                    folder={item as FolderData}
                    isAdmin={workspace.isAdmin}
                    onPress={() =>
                      handleClickFolder(
                        (item as FolderData).dirId.toString(),
                        (item as FolderData).dirName,
                      )
                    }
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
      ) : (
        <EmptyView>폴더나 파일이 없습니다.</EmptyView>
      )}
    </Container>
  );
};

export default FileScreen;
