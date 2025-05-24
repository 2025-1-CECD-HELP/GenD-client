import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {InviteMemberModal} from '../components/InviteMemberModal';
import {useModal} from '@/contexts/modal/ModalContext';
import CommonModal from '@/components/CommonModal';
import {useCreateWorkspaceMutation} from './useCreateWorkspaceMutation';

export function useCreateWorkspace() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const {setModalContent, setIsOpen} = useModal();
  const {mutate: createWorkspace} = useCreateWorkspaceMutation();

  const handleSelectPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri || null);
    }
  };

  const handleAddMember = async () => {
    setIsOpen(true);
    setModalContent(
      <CommonModal
        children={
          <InviteMemberModal members={members} setMembers={setMembers} />
        }
        type={'default'}
        title={'워크스페이스 멤버 추가'}
        onConfirm={() => {}}
      />,
    );
  };

  const handleCreateWorkspace = () => {
    createWorkspace({
      workspaceName: name,
      workspaceDescription: desc,
      inviteEmailList: members.map(email => ({email})),
      imageUri: image || undefined,
    });
  };
  return {
    name,
    setName,
    desc,
    setDesc,
    image,
    setImage,
    handleSelectPhoto,
    handleAddMember,
    members,
    setMembers,
    handleCreateWorkspace,
  };
}
