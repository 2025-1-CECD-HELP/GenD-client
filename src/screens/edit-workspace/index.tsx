import React, {useEffect, useState} from 'react';
import {
  Container,
  ImageWrapper,
  ProfileCircle,
  ProfileText,
  SelectPhoto,
  Label,
  Input,
  InputCount,
  SubmitButton,
  SubmitButtonText,
  DeleteButton,
} from './index.style';
import {TopBar} from '@/components/TopBar';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {Image} from 'react-native';

import {useEditWorkspace} from './hooks/useEditWorkspace';
import {useTheme} from '@emotion/react';
import {useWorkspaceQuery} from '../home/hooks/useWorkspaceQuery';

export const EditWorkspaceScreen = () => {
  const theme = useTheme();
  const navigation = useTypeSafeNavigation();
  const {data: workspace} = useWorkspaceQuery();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const {
    name,
    setName,
    desc,
    setDesc,
    image,
    handleSelectPhoto,
    handleEditWorkspace,
    handleDeleteWorkspace,
  } = useEditWorkspace();

  useEffect(() => {
    setName(workspace?.workspaceName ?? '');
    setDesc(workspace?.workspaceDescription ?? '');
  }, [workspace, setName, setDesc]);

  const handleImageSelect = async () => {
    const result = await handleSelectPhoto();
    setSelectedImage(result ?? null);
  };

  return (
    <Container>
      <TopBar
        title="워크스페이스 수정"
        showBackButton={true}
        onPressBack={() => navigation.navigate('LANDING', {})}
      />
      <ImageWrapper>
        <ProfileCircle onPress={handleImageSelect}>
          {selectedImage || workspace?.imageUrl ? (
            <Image
              source={{uri: image ?? workspace?.imageUrl}}
              style={{width: 120, height: 120, borderRadius: 60}}
            />
          ) : (
            <ProfileText>대표 사진</ProfileText>
          )}
        </ProfileCircle>
        <SelectPhoto onPress={handleImageSelect}>사진 선택하기</SelectPhoto>
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

      <SubmitButton onPress={handleEditWorkspace}>
        <SubmitButtonText>수정하기</SubmitButtonText>
      </SubmitButton>
      <DeleteButton onPress={handleDeleteWorkspace}>
        <SubmitButtonText>워크스페이스 삭제하기</SubmitButtonText>
      </DeleteButton>
    </Container>
  );
};
