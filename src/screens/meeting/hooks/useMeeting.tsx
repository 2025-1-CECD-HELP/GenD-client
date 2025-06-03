import {useAtom} from 'jotai';
import {recordingState} from '@/atoms/recording';
import {useModal} from '@/contexts/modal/ModalContext';
import {CommonModal} from '@/components';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';

/**
 * 미팅 화면에서 사용하는 custom-hook 입니다.
 * 템플릿 생성 및 선택 시 값을 전달하는 데에 사용됩니다.
 * @author 홍규진
 */
export const useMeeting = () => {
  const [recording, setRecording] = useAtom(recordingState);
  const navigation = useTypeSafeNavigation();
  const {setIsOpen, setModalContent} = useModal();
  const handleTemplateSelection = () => {
    if (
      recording.templateId !== 1 &&
      recording.templateId !== 2 &&
      recording.templateId !== 3
    ) {
      setIsOpen(true);
      setModalContent(
        <CommonModal
          type="confirm"
          title="템플릿 선택"
          content="회의록 작성을 위해 템플릿을 선택해주세요."
          onConfirm={() => {
            setIsOpen(false);
          }}
        />,
      );
      return;
    }

    navigation.navigate('RECORDING', {
      templateId: recording.templateId,
    });
  };

  return {
    handleTemplateSelection,
    recording,
    setRecording,
  };
};
