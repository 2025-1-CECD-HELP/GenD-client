import React, {useRef} from 'react';
import {useState} from 'react';
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
import {OptionsBox} from '../OptionsBox';
import {useModal} from '@/contexts/modal/ModalContext';
import CommonModal from '../CommonModal';
import {
  useDeleteDirectoryMutation,
  useRenameDirectoryMutation,
} from '@/screens/file/hooks/uesFileMutation';
import {useWorkspace} from '@/hooks/useWorkspace';

export type FolderPreviewProps = {
  folder: FolderData;
  isAdmin: boolean;
};

export const FolderPreview = ({folder, isAdmin}: FolderPreviewProps) => {
  const {shadow, textDisabled, red, textPrimary} = useThemeColors();
  const {setModalContent, setIsOpen} = useModal();
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const menuRef = useRef<View>(null);
  const {workspaceId} = useWorkspace();
  const {mutate: patchDirectoryMutation} = useRenameDirectoryMutation();
  const {mutate: deleteDirectoryMutation} = useDeleteDirectoryMutation();
  const handleMenuPress = () => {
    menuRef.current?.measureInWindow((x, y, width, height) => {
      setMenuPosition({x, y, width, height});
      setIsOptionsVisible(true);
    });
  };

  const options = [
    {
      label: '이름 변경',
      onPress: () => {
        setIsOpen(true);
        setIsOptionsVisible(false);

        setModalContent(
          <CommonModal
            title="폴더 이름 변경"
            type="input"
            inputPlaceholder="변경할 폴더 이름을 입력하세요"
            onConfirm={inputValue => {
              patchDirectoryMutation({
                workspaceId: workspaceId!,
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
      style={{borderRadius: 13, width: '100%'}}
      offset={[0, 0]}
      startColor={shadow}>
      <Container onPress={() => {}}>
        <FormatPreview activeOpacity={0.8}>
          <FolderIcon width={48} height={48} />
        </FormatPreview>
        <Divider />
        <ContentContainer>
          <Title>{folder.dirName}</Title>
          {isAdmin && (
            <View ref={menuRef}>
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
      <OptionsBox
        visible={isOptionsVisible}
        onClose={() => setIsOptionsVisible(false)}
        options={options}
        position={menuPosition}
      />
    </Shadow>
  );
};
