import React from 'react';
import {MemberProfile} from '@/components/MemberProfile';
import {ProfileSection, WorkspaceAlarmText} from './index.style';

interface ProfileProps {
  name: string;
  workspaceCount: number;
}

export const Profile: React.FC<ProfileProps> = ({name, workspaceCount}) => (
  <ProfileSection>
    <MemberProfile name={name} position="none" isCurrentUserManager={false} />
    <WorkspaceAlarmText>
      {workspaceCount}개 워크스페이스 참여 중
    </WorkspaceAlarmText>
  </ProfileSection>
);
