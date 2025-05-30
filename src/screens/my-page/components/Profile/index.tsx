import React from 'react';
import {MemberProfile} from '@/components/MemberProfile';
import {ProfileSection, WorkspaceAlarmText} from './index.style';
import {TGetUserResponse} from '@/services/auth/types';

interface ProfileProps {
  user: TGetUserResponse;
  workspaceCount: number;
}

export const Profile: React.FC<ProfileProps> = ({user, workspaceCount}) => (
  <ProfileSection>
    <MemberProfile member={user} />
    <WorkspaceAlarmText>
      {workspaceCount}개 워크스페이스 참여 중
    </WorkspaceAlarmText>
  </ProfileSection>
);
