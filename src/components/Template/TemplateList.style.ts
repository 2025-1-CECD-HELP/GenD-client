import styled from '@emotion/native';
import {ViewStyle} from 'react-native';

// FlatList의 스타일 속성으로 사용할 객체들
export const columnWrapperStyle: ViewStyle = {
  justifyContent: 'space-between',
  marginBottom: 16,
  gap: 16,
};

export const FilePreviewWrapper = styled.View<{width: number}>`
  width: ${props => props.width}px;
`;
