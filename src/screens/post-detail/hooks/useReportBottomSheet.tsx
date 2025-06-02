import {useBottomSheet} from '@/contexts/bottomSheet/BottomSheetContext';
import {useModal} from '@/contexts/modal/ModalContext';
import {ReportBottomSheet} from '../components/ReportBottomSheet';
import {CommonModal} from '@/components';

/**
 * 게시글 신고하기 바텀시트 관리 훅입니다.
 * 신고 사유를 선택하면 바텀시트를 닫고 신고 완료 모달을 표시합니다.
 * @author 이정선
 */

export const useReportBottomSheet = () => {
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();
  const {setModalContent, setIsOpen: openModal} = useModal();

  const handleReportSelect = (
    reason: string,
    onReportSelect: (reason: string) => void,
  ) => {
    closeBottomSheet();
    onReportSelect(reason);
    setModalContent(
      <CommonModal
        type="check"
        title="신고가 완료되었습니다."
        onConfirm={() => {
          setModalContent(null);
          openModal(false);
        }}
      />,
    );
    openModal(true);
  };

  const openReportSheet = (onReportSelect: (reason: string) => void) => {
    openBottomSheet(
      <ReportBottomSheet
        onSelect={(reason: string) =>
          handleReportSelect(reason, onReportSelect)
        }
      />,
    );
  };

  return {
    openReportSheet,
  };
};
