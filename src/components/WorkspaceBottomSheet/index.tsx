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
  EmptyWorkspace,
  EmptyWorkspaceText,
  LoginButton,
  LoginButtonText,
} from './index.style';
import {
  TGetWorkspaceListResponse,
  TWorkspace,
} from '@/services/workspace/types';
import {navigate} from '@/navigation/navigator';

interface WorkspaceBottomSheetProps {
  workspaceList?: TGetWorkspaceListResponse;
  onSelect: (workspace: TWorkspace) => void;
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
      {workspaceList?.workspaceList &&
      workspaceList?.workspaceList.length > 0 ? (
        workspaceList?.workspaceList.map(ws => (
          <WorkspaceItem key={ws.workspaceId} onPress={() => onSelect(ws)}>
            <TitleRow>
              <WorkspaceTitle>{ws.workspaceName}</WorkspaceTitle>
              <GoText>바로가기 &gt;</GoText>
            </TitleRow>
            <WorkspaceDesc>{ws.workspaceDescription}</WorkspaceDesc>
          </WorkspaceItem>
        ))
      ) : (
        <EmptyWorkspace>
          <EmptyWorkspaceText>워크스페이스가 없습니다.</EmptyWorkspaceText>
          <LoginButton
            onPress={() => {
              navigate('LOGIN', {});
            }}>
            <LoginButtonText>로그인 하러가기</LoginButtonText>
          </LoginButton>
        </EmptyWorkspace>
      )}
      <AddButton onPress={onAdd}>
        <AddButtonText>새로운 워크스페이스 추가</AddButtonText>
      </AddButton>
    </Container>
  );
};
