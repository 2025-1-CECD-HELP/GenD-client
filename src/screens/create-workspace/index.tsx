import React from 'react';
import {
  Container,
  ImageWrapper,
  ProfileCircle,
  ProfileText,
  SelectPhoto,
  Label,
  Input,
  InputCount,
  InviteRow,
  InviteButton,
  InviteButtonText,
  InfoText,
  SubmitButton,
  SubmitButtonText,
  MemberList,
  MemberItem,
} from './index.style';
import {TopBar} from '@/components/TopBar';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {Image} from 'react-native';

import {useCreateWorkspace} from './hooks/useCreateWorkspace';
import {useTheme} from '@emotion/react';
import {Divider} from '../my-page/index.style';

export const CreateWorkspaceScreen = () => {
  const theme = useTheme();
  const navigation = useTypeSafeNavigation();
  const {
    name,
    setName,
    desc,
    setDesc,
    image,
    handleSelectPhoto,
    members,
    handleAddMember,
    handleCreateWorkspace,
  } = useCreateWorkspace();

  return (
    <Container>
      <TopBar
        title="워크스페이스 생성"
        showBackButton={true}
        onPressBack={() => navigation.navigate('INIT_WORKSPACE', {})}
      />
      <ImageWrapper>
        <ProfileCircle onPress={handleSelectPhoto}>
          {image ? (
            <Image
              source={{uri: image}}
              style={{width: 120, height: 120, borderRadius: 60}}
            />
          ) : (
            <ProfileText>대표 사진</ProfileText>
          )}
        </ProfileCircle>
        <SelectPhoto onPress={handleSelectPhoto}>사진 선택하기</SelectPhoto>
      </ImageWrapper>

      <Label>워크스페이스 이름</Label>
      <Input
        placeholder="워크스페이스 이름을 입력하세요"
        placeholderTextColor={theme.colors.textDisabled}
        value={name}
        onChangeText={setName}
        maxLength={20}
      />
      <InputCount>{name.length}/20</InputCount>

      <Label>워크스페이스 소개</Label>
      <Input
        placeholder="워크스페이스 소개를 입력하세요"
        placeholderTextColor={theme.colors.textDisabled}
        value={desc}
        onChangeText={setDesc}
        maxLength={200}
        multiline
      />
      <InputCount>{desc.length}/200</InputCount>

      <InviteRow>
        <Label>워크스페이스 멤버 추가</Label>
        <InviteButton onPress={handleAddMember}>
          <InviteButtonText>이메일로 초대하기</InviteButtonText>
        </InviteButton>
      </InviteRow>
      <MemberList>
        {members.length > 0 ? (
          members.map(email => (
            <MemberItem key={email}>
              <InfoText>{email}</InfoText>
            </MemberItem>
          ))
        ) : (
          <InfoText>초대된 멤버가 없습니다.</InfoText>
        )}
      </MemberList>
      <Divider />
      <InfoText>워크스페이스 생성 후에도 멤버 초대가 가능합니다.</InfoText>

      <SubmitButton onPress={handleCreateWorkspace}>
        <SubmitButtonText>생성하기</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
};
