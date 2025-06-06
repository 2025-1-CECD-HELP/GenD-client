import React, {useRef} from 'react';
import {FolderData} from './index.type';
import {FolderIcon} from '@/assets/images/svg/file';
import {Shadow} from 'react-native-shadow-2';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {
  Container,
  FormatPreview,
  ContentContainer,
  Title,
  Divider,
} from './index.style';
import {MoreIcon} from '@/assets/images/svg/file';
import {View} from 'react-native';
import {useModal} from '@/contexts/modal/ModalContext';
import CommonModal from '../CommonModal';
import {OptionsBox} from '../OptionsBox';
import {
  useDeleteDirectoryMutation,
  useRenameDirectoryMutation,
} from '@/screens/file/hooks/uesFileMutation';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

export type FolderPreviewProps = {
  folder: FolderData;
  isAdmin: boolean;
  onPress: () => void;
};

export const FolderPreview = ({
  folder,
  isAdmin,
  onPress,
}: FolderPreviewProps) => {
  const {shadow, textDisabled, red, textPrimary} = useThemeColors();
  const {setModalContent, setIsOpen} = useModal();
  const menuRef = useRef<View>(null);
  const [workspace] = useAtom(workspaceState);
  const {mutate: patchDirectoryMutation} = useRenameDirectoryMutation();
  const {mutate: deleteDirectoryMutation} = useDeleteDirectoryMutation();

  const handleMenuPress = () => {
    setIsOpen(true);
    setModalContent(
      <CommonModal title="폴더 관리" type="confirm">
        <OptionsBox options={options} />
      </CommonModal>,
    );
  };

  const options = [
    {
      label: '이름 변경',
      onPress: () => {
        setIsOpen(true);
        setModalContent(
          <CommonModal
            title="폴더 이름 변경"
            type="input"
            inputPlaceholder="변경할 폴더 이름을 입력하세요"
            onConfirm={inputValue => {
              patchDirectoryMutation({
                workspaceId: workspace.workspaceId,
                dirId: folder.dirId,
                directoryName: inputValue!,
              });
              setIsOpen(false);
            }}
            onCancel={() => {
              setIsOpen(false);
            }}
          />,
        );
      },
      color: textPrimary,
    },
    {
      label: '삭제하기',
      onPress: () => {
        setIsOpen(true);
        setModalContent(
          <CommonModal
            title="폴더 삭제"
            type="confirm"
            onConfirm={() => {
              deleteDirectoryMutation({
                dirId: folder.dirId,
              });
              setIsOpen(false);
            }}
            onCancel={() => {
              setIsOpen(false);
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
      <Container ref={menuRef}>
        <FormatPreview activeOpacity={0.8} onPress={onPress}>
          <FolderIcon width={48} height={48} />
        </FormatPreview>
        <Divider />
        <ContentContainer>
          <Title>{folder.dirName}</Title>
          {isAdmin && (
            <View>
              <MoreIcon
                onPress={handleMenuPress}
                fill={textDisabled}
                width={20}
                height={20}
              />
            </View>
          )}
        </ContentContainer>
      </Container>
    </Shadow>
  );
};
