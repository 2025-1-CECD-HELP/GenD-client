import React, {useState} from 'react';
import {
  Container,
  Title,
  ReasonButton,
  ReasonContent,
  ReasonContainer,
} from './index.style';
import {Button} from '@/components';

/**
 * 게시글 신고 바텀시트 컴포넌트입니다.
 * @author 이정선
 */

const REPORT_REASONS = [
  '마음에 들지 않습니다.',
  '부적절한 콘텐츠입니다.',
  '스팸 또는 광고입니다.',
  '불쾌한 표현이 있습니다.',
  '거짓 정보입니다.',
  '음란물입니다.',
];

interface ReportBottomSheetProps {
  onSelect: (reason: string) => void;
}

export const ReportBottomSheet: React.FC<ReportBottomSheetProps> = ({
  onSelect,
}) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedReason) {
      onSelect(selectedReason);
    }
  };

  return (
    <Container>
      <Title>신고 사유를 선택해주세요</Title>
      <ReasonContainer>
        {REPORT_REASONS.map(reason => (
          <ReasonButton
            key={reason}
            selected={selectedReason === reason}
            onPress={() =>
              setSelectedReason(prev => (prev === reason ? null : reason))
            }>
            <ReasonContent>{reason}</ReasonContent>
          </ReasonButton>
        ))}
      </ReasonContainer>
      <Button
        text="신고하기"
        shape="round"
        onPress={handleConfirm}
        disabled={!selectedReason}
        variant={!selectedReason ? 'disabled' : 'filled'}
      />
    </Container>
  );
};
