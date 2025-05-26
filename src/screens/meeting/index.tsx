import React, {useState} from 'react';
import {TemplateList} from '@/components/Template/TemplateList';
import {
  Container,
  Header,
  Title,
  GuideText,
  ButtonContainer,
} from './index.style';
import {Button} from '@/components/Button';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
/**
 * 미팅 페이지입니다. 향후에는 이 미팅 페이지를 들어갔을 때 워크 스페이스 여부를 확인해야합니다.
 * 현재는 템플릿 선택 후 회의록 작성 페이지로 이동합니다.
 * @author 홍규진
 */

export const MeetingScreen = () => {
  const navigation = useTypeSafeNavigation();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <Container>
      <Header>
        <Title>회의 시작하기</Title>
      </Header>
      <GuideText>
        회의의 유형에 맞는 회의록 템플릿을 선택하세요!{'\n'}
        템플릿에 맞추어 회의록을 작성해드려요
      </GuideText>
      <TemplateList
        selectedTemplate={selectedTemplate}
        onSelectTemplate={setSelectedTemplate}
      />
      <ButtonContainer>
        <Button
          onPress={() => {
            // 선택된 템플릿 활용
            if (selectedTemplate) {
              // 예: 다음 화면 이동 등
              navigation.navigate('RECORDING', {
                templateId: selectedTemplate,
              });
            }
          }}
          text="회의록 선택"
          variant="filled"
          shape="round"
        />
      </ButtonContainer>
    </Container>
  );
};
