import React from 'react';
import {SvgProps} from 'react-native-svg';
import {
  Container,
  ContentContainer,
  Icon,
  Title,
  Description,
  Button,
  ButtonText,
} from './index.style';
import {useTheme} from '@emotion/react';

/**
 * 회의 시작 시 템플릭 선택 페이지에 사용될 템플릿 컴포넌트 입니다.
 * 선택 여부(isSelected)에 따라 스타일이 달라지며, 선택된 템플릿을 시각적으로 구분할 수 있도록 합니다.
 * 다양한 템플릿 유형을 확장 가능하도록 템플릿 이름, 설명, 아이콘을 props로 받아서 구현하였습니다.
 * @author 이정선
 */

export type TemplateProps = {
  title: string;
  description: string;
  Icon: React.FC<SvgProps>;
  isSelected: boolean;
  onPressTemplate: () => void; // 템플릿을 선택했을 때
  onPreePreview: () => void; // 템플릿의 미리보기 버튼을 선택했을 때
};

export const Template = ({
  title,
  description,
  Icon,
  isSelected,
  onPressTemplate,
  onPreePreview,
}: TemplateProps) => {
  const theme = useTheme();
  return (
    <Container
      onPress={onPressTemplate}
      activeOpacity={0.8}
      isSelected={isSelected}>
      <Icon fill={theme.colors.textPrimary} />
      <ContentContainer>
        <Title>{title} 템플릿</Title>
        <Description>{description}</Description>
      </ContentContainer>
      <Button onPress={onPreePreview} activeOpacity={0.8}>
        <ButtonText>미리보기</ButtonText>
      </Button>
    </Container>
  );
};
