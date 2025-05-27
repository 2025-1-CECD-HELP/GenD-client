import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {useEditWorkspaceMutation} from './useEditWorkspaceMutation';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';
import {useDeleteWorkspaceMutation} from './useDeleteWorkspaceMutation';
import {useModal} from '@/contexts/modal/ModalContext';
import {CommonModal} from '@/components';

/**
 * 워크스페이스 수정 훅입니다.
 * 워크스페이스 수정 화면에 필요한 상태와 함수를 제공합니다.
 * 워크스페이스 수정 뮤테이션을 호출합니다.
 * @author 홍규진
 */
export function useEditWorkspace() {
  const [workspace] = useAtom(workspaceState);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const {mutate: editWorkspace} = useEditWorkspaceMutation();
  const {mutate: deleteWorkspace} = useDeleteWorkspaceMutation();
  const {setIsOpen, setModalContent} = useModal();

  const handleSelectPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri || null);
    }
  };

  const handleEditWorkspace = () => {
    editWorkspace({
      workspaceId: workspace.workspaceId,
      workspaceName: name,
      workspaceDescription: desc,
      inviteEmailList: members.map(email => ({email})),
      imageUri: image || undefined,
    });
  };

  const handleDeleteWorkspace = () => {
    setIsOpen(true);
    setModalContent(
      <CommonModal
        type={'default'}
        title={'워크스페이스 삭제하기'}
        content="정말로 워크스페이스를 삭제하시겠습니까?"
        isCenter={true}
        onConfirm={() => {
          deleteWorkspace(workspace.workspaceId);
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
      />,
    );
  };
  return {
    name,
    setName,
    desc,
    setDesc,
    image,
    setImage,
    handleSelectPhoto,
    members,
    setMembers,
    handleEditWorkspace,
    handleDeleteWorkspace,
  };
}
