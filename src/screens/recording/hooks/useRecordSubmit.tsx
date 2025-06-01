import {useAtom} from 'jotai';
import {recordingState} from '@/atoms/recording';
import {useModal} from '@/contexts/modal/ModalContext';
import {CommonModal} from '@/components/CommonModal';
import {PreviewContent} from '../components/RecordingPreviewModal';
import {RecordingSubmitForm} from '../components/RecordingSubmitModal';
import {useFinalRecordMutation, useRecordMutation} from './useRecordMutation';
import {useState} from 'react';

interface UseRecordSubmitReturn {
  handleStopRecording: (path: string) => Promise<void>;
  handleFinalSubmit: (currentRecording: any) => Promise<void>;
  isLoading: boolean;
}

export const useRecordSubmit = (): UseRecordSubmitReturn => {
  const [recording, setRecording] = useAtom(recordingState);
  const {setModalContent, setIsOpen} = useModal();
  const {mutateAsync: finalSubmitRecord} = useFinalRecordMutation();
  const {mutateAsync: submitRecord} = useRecordMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleStopRecording = async (path: string) => {
    try {
      setIsLoading(true);
      const file = {
        uri: path,
        name: 'recording.m4a',
        type: 'audio/m4a',
      };

      // audioFile 업데이트
      setRecording(prev => ({
        ...prev,
        audioFile: file,
      }));

      // 2. 녹음 결과를 미리 보는 API 호출
      const data = await submitRecord({
        templateId: String(recording.templateId),
        meetingRecord: file,
      });

      console.log('2. 녹음 결과 데이터 왔어요', data);
      const updatedContent = data?.templateContent || [];

      // templateContent 업데이트
      setRecording(prev => ({
        ...prev,
        templateContent: updatedContent,
      }));

      const showSubmitModal = () => {
        setModalContent(
          <CommonModal
            type="default"
            title="회의록 저장하기"
            onConfirm={() => {
              setRecording(currentRecording => {
                console.log('최종 제출 시 상태:', currentRecording);
                handleFinalSubmit(currentRecording);
                return currentRecording;
              });
            }}
            onCancel={() => setIsOpen(false)}>
            <RecordingSubmitForm initialData={recording} />
          </CommonModal>,
        );
        setIsOpen(true);
      };

      //3. 미리보기 모달 띄우기
      setModalContent(
        <CommonModal
          type="default"
          title="회의록 미리보기"
          onConfirm={() => {
            setIsOpen(false);
            showSubmitModal();
          }}
          onCancel={() => setIsOpen(false)}>
          <PreviewContent
            templateContent={updatedContent}
            onChange={content => {
              setRecording(prev => ({
                ...prev,
                templateContent: content,
              }));
            }}
          />
        </CommonModal>,
      );
      setIsOpen(true);
    } catch (error) {
      console.error('녹음 처리 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSubmit = async (currentRecording: typeof recording) => {
    try {
      setIsLoading(true);
      if (!currentRecording.templateId || !currentRecording.templateContent) {
        console.error('필수 데이터가 누락되었습니다:', currentRecording);
        return;
      }

      console.log('최종 제출 데이터 확인:', currentRecording);
      await finalSubmitRecord({
        templateId: currentRecording.templateId,
        templateContent: currentRecording.templateContent,
        fileName: currentRecording.title || '새 회의록',
        directoryId: parseInt(currentRecording.folder, 10),
      });
    } catch (error) {
      console.error('최종 제출 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleStopRecording,
    handleFinalSubmit,
    isLoading,
  };
};
