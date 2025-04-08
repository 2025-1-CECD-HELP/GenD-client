import styled from '@emotion/native';
import {ViewStyle} from 'react-native';
import {FileData} from './index.type';
import {FlatList} from 'react-native';

export const FilePreviewWrapper = styled.View<{width: number}>`
  width: ${props => props.width}px;
`;

// FlatList의 스타일 속성으로 사용할 객체들
export const columnWrapperStyle: ViewStyle = {
  justifyContent: 'space-between',
  marginBottom: 16,
  gap: 16,
};

export const FilePreviewContainer = styled(FlatList<FileData>)({
  overflow: 'visible',
});
