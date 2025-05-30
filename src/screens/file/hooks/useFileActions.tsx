
import {useCallback} from 'react';
import {Linking, Share} from 'react-native';
import {useModal} from '@/contexts/modal/ModalContext';
import {CommonModal} from '@/components/CommonModal';
import {useDeleteFileMutation, useRenameFileMutation} from './uesFileMutation';
import {FileData} from '@/components/FilePreview/index.type';

export const useFileActions = (file: FileData) => {
  const {setIsOpen, setModalContent} = useModal();
  const {mutate: renameFileMutation} = useRenameFileMutation();
  const {mutate: deleteFileMutation} = useDeleteFileMutation();

  const downloadFile = useCallback(async () => {
    try {
      const url = file.documentFile;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        setIsOpen(true);
        setModalContent(
          <CommonModal
            title="다운로드 실패"
            type="default"
            content="지원하지 않는 파일 형식입니다."
            onConfirm={() => setIsOpen(false)}
          />,
        );
      }
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);
      setIsOpen(true);
      setModalContent(
        <CommonModal
          title="다운로드 실패"
          type="default"
          content="파일 다운로드 중 오류가 발생했습니다."
          onConfirm={() => setIsOpen(false)}
        />,
      );
    }
  }, [file.documentFile, setIsOpen, setModalContent]);

  const shareFile = useCallback(async () => {
    try {
      const result = await Share.share({
        message: `${file.documentTitle} 파일을 공유합니다.\n${file.documentFile}`,
        url: file.documentFile,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('공유 완료:', result.activityType);
        } else {
          console.log('공유 완료');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('공유 취소');
      }
    } catch (error) {
      console.error('파일 공유 중 오류 발생:', error);
      setIsOpen(true);
      setModalContent(
        <CommonModal
          title="공유 실패"
          type="default"
          content="파일 공유 중 오류가 발생했습니다."
          onConfirm={() => setIsOpen(false)}
        />,
      );
    }
  }, [file.documentTitle, file.documentFile, setIsOpen, setModalContent]);

  const handleRename = useCallback(() => {
    setIsOpen(true);
    setModalContent(
      <CommonModal
        title="파일 이름 변경"
        type="input"
        inputPlaceholder="파일 이름을 입력하세요"
        onConfirm={inputValue => {
          if (inputValue) {
            renameFileMutation({
              documentId: file.documentId,
              documentTitle: inputValue,
            });
            setModalContent(
              <CommonModal
                title="변경 완료"
                type="default"
                content="파일 이름이 변경되었습니다."
                onConfirm={() => true}
              />,
            );
          }
        }}
      />,
    );
  }, [file.documentId, setIsOpen, setModalContent, renameFileMutation]);

  const handleDelete = useCallback(() => {
    setIsOpen(true);
    setModalContent(
      <CommonModal
        title="파일 삭제"
        type="check"
        content="파일을 삭제하시겠습니까?"
        onConfirm={() => {
          deleteFileMutation({
            documentId: file.documentId,
          });
          setModalContent(
            <CommonModal
              title="삭제 완료"
              type="default"
              content="파일이 삭제되었습니다."
              onConfirm={() => true}
            />,
          );
        }}
      />,
    );
  }, [file.documentId, setIsOpen, setModalContent, deleteFileMutation]);

  return {
    downloadFile,
    shareFile,
    handleRename,
    handleDelete,
  };
};
