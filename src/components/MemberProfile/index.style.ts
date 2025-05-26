import styled from '@emotion/native';
import {ActiveMemberPosition} from './index.type';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.backgroundBase};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 15px;
`;

export const ProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

export const ContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const ProfileImage = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
`;

export const MemberName = styled.Text`
  ${({theme}) => theme.fonts.title5};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const PositionTag = styled.View<{position: ActiveMemberPosition}>`
  border-radius: 50px;
  background-color: ${({theme, position}) =>
    position === 'manager' ? theme.colors.blue : theme.colors.blueSecondary};
  padding: 2px 7px;
`;

export const PositionText = styled.Text<{position: ActiveMemberPosition}>`
  color: ${({theme, position}) =>
    position === 'manager' ? theme.colors.white : theme.colors.textPrimary};
  ${({theme}) => theme.fonts.text5};
`;
