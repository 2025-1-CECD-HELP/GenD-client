import React from 'react';
import {ProfileContainer, Avatar, Greeting} from './index.style';
import secretaryAvatar from '@/assets/images/png/secretary/avartar.png';

/**
 * 비서 프로필 화면입니다.
 * 비서 프로필 이미지와 비서 인사말을 표시합니다.
 * @author 홍규진
 */
export const SecretaryProfile = () => {
  return (
    <ProfileContainer>
      <Avatar source={secretaryAvatar} />
      <Greeting>{'안녕하세요!\n당신을 위한 비서입니다.'}</Greeting>
    </ProfileContainer>
  );
};
