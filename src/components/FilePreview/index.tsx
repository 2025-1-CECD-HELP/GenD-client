import React, {useRef, useState} from 'react';
import {
  FormatPreview,
  ContentContainer,
  Title,
  Divider,
  Container,
} from './index.style';
import {FileData} from './index.type';
import {
  AudioFormat,
  DocFormat,
  MoreIcon,
  DownLoadIcon,
} from '@/assets/images/svg/file';
import {Shadow} from 'react-native-shadow-2';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {OptionsBox} from '@/components/OptionsBox';
import {View} from 'react-native';

import {
  useDeleteFileMutation,
  useRenameFileMutation,
} from '@/screens/file/hooks/uesFileMutation';
import {useModal} from '@/contexts/modal/ModalContext';
import {CommonModal} from '../CommonModal';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

/**
 * 자료 관리 페이지에 사용될 파일 프리뷰 컴포넌트 입니다.
 * - 파일 확장자에 따라 아이콘이 달라집니다.
 * - 사용자 권한(member, manager)에 따라 액션 아이콘(다운로드 or 더보기)이 달라집니다.
 * - 클릭 시 파일 열기 및 액션 실행
 * @author 이정선, 홍규진
 */

export const FilePreview = (file: FileData) => {
  const {blue, textDisabled, shadow, red, textPrimary} = useThemeColors();
  const [workspace] = useAtom(workspaceState);
  console.log('workspace', workspace);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const {mutate: renameFileMutation} = useRenameFileMutation();
  const {mutate: deleteFileMutation} = useDeleteFileMutation();
  const {setIsOpen, setModalContent} = useModal();

  const menuRef = useRef<View>(null);

  const FormatIcon = file.docuementType === 'mp3' ? AudioFormat : DocFormat;

  const MenuIcon = workspace.isAdmin ? MoreIcon : DownLoadIcon;

  const handleMenuPress = () => {
    setIsOptionsVisible(true);
  };

  const options = [
    {
      label: '다운로드',
      onPress: () => setIsOptionsVisible(false),
      color: blue,
    },
    {
      label: '공유하기',
      onPress: () => setIsOptionsVisible(false),
      color: textPrimary,
    },
    {
      label: '이름 변경',
      onPress: () => {
        setIsOptionsVisible(false);
        setIsOpen(true);
        setModalContent(
          <CommonModal
            title="파일 이름 변경"
            type="input"
            inputPlaceholder="파일 이름을 입력하세요"
            onConfirm={inputValue => {
              if (inputValue) {
                renameFileMutation({
                  documentId: file.documentId,
                  documentTitle: inputValue,
                });
              }
            }}
          />,
        );
      },
      color: textPrimary,
    },
    {
      label: '삭제하기',
      onPress: () => {
        setIsOptionsVisible(false);
        setIsOpen(true);
        setModalContent(
          <CommonModal
            title="파일 삭제"
            type="default"
            content="파일을 삭제하시겠습니까?"
            onConfirm={() => {
              deleteFileMutation({
                documentId: file.documentId,
              });
            }}
          />,
        );
      },
      color: red,
    },
  ];

  return (
    <Shadow
      distance={5}
      style={{borderRadius: 13, width: '100%', position: 'relative'}}
      offset={[0, 0]}
      startColor={shadow}>
      <Container ref={menuRef} isFile={true}>
        <FormatPreview activeOpacity={0.8} onPress={() => {}}>
          <FormatIcon width={48} height={48} />
        </FormatPreview>
        <Divider />
        <ContentContainer>
          <Title>{file.documentTitle}</Title>
          <View>
            <MenuIcon
              onPress={handleMenuPress}
              fill={textDisabled}
              width={20}
              height={20}
            />
          </View>
        </ContentContainer>
      </Container>
      <OptionsBox
        visible={isOptionsVisible}
        onClose={() => setIsOptionsVisible(false)}
        options={options}
        menuRef={menuRef}
        isFile={true}
      />
    </Shadow>
  );
};
