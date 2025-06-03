import {FileData} from '@/components/FilePreview/index.type';
import {FolderData} from '@/components/FolderPreview/index.type';
import styled from '@emotion/native';
import {FlatList} from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const SearchBarWrapper = styled.View`
  padding: 0px 16px;
`;

export const EmptyView = styled.Text`
  text-align: center;
  margin-top: 20px;
  color: ${({theme}) => theme.colors.textDisabled};
`;

export const FileList = styled(FlatList<FileData | FolderData>)`
  flex: 1;
`;

export const ItemWrapper = styled.View`
  position: relative;
  width: 48%;
  margin-bottom: 16px;
`;

export const columnWrapperStyle = {
  justifyContent: 'space-between' as const,
  paddingHorizontal: 16,
};

export const Breadcrumb = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 20px 12px 20px;
`;

export const BreadcrumbText = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: 15px;
  font-weight: 500;
`;

export const BreadcrumbArrow = styled.Text`
  color: ${({theme}) => theme.colors.textDisabled};
  margin: 0 6px;
`;

export const BreadcrumbItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FileGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 20px;
`;

export const FileCard = styled.View`
  width: 45%;
  background: #fff;
  border-radius: 16px;
  align-items: center;
  margin-bottom: 20px;
  padding: 18px 0 10px 0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
`;

export const FileIcon = styled.View`
  margin-bottom: 8px;
`;

export const FileTitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const FileInfo = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.colors.textDisabled};
  margin-top: 2px;
`;
