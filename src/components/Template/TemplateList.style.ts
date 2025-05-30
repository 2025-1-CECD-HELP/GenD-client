import styled from '@emotion/native';
import {ViewStyle} from 'react-native';

// FlatList의 스타일 속성으로 사용할 객체들
export const columnWrapperStyle = (gap: number): ViewStyle => ({
  justifyContent: 'space-between',
  gap: gap,
  marginBottom: gap,
});

export const FilePreviewWrapper = styled.View<{width: number}>`
  width: ${props => props.width}px;
`;

export const TemplatePreview = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;
