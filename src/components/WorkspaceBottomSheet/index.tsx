import React from 'react';
import {
  Container,
  Title,
  WorkspaceItem,
  TitleRow,
  WorkspaceTitle,
  GoText,
  WorkspaceDesc,
  AddButton,
  AddButtonText,
} from './index.style';
import {TGetWorkspaceListResponse} from '@/services/workspace/types';

interface WorkspaceBottomSheetProps {
  workspaceList: TGetWorkspaceListResponse;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

export const WorkspaceBottomSheet: React.FC<WorkspaceBottomSheetProps> = ({
  workspaceList,
  onSelect,
  onAdd,
}) => {
  return (
    <Container>
      <Title>워크스페이스 목록</Title>
      {workspaceList.workspaceList.map(ws => (
        <WorkspaceItem
          key={ws.workspaceId}
          onPress={() => onSelect(ws.workspaceId)}>
          <TitleRow>
            <WorkspaceTitle>{ws.workspaceName}</WorkspaceTitle>
            <GoText>바로가기 &gt;</GoText>
          </TitleRow>
          <WorkspaceDesc>{ws.workspaceDescription}</WorkspaceDesc>
        </WorkspaceItem>
      ))}
      <AddButton onPress={onAdd}>
        <AddButtonText>새로운 워크스페이스 추가</AddButtonText>
      </AddButton>
    </Container>
  );
};
