import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {InviteMemberModal} from '../components/InviteMemberModal';
import {useModal} from '@/contexts/modal/ModalContext';
import CommonModal from '@/components/CommonModal';
import {useCreateWorkspaceMutation} from './useCreateWorkspaceMutation';
import {Alert} from 'react-native';

/**
 * 워크스페이스 생성 훅입니다.
 * 워크스페이스 생성 화면에 필요한 상태와 함수를 제공합니다.
 * 워크스페이스 생성 뮤테이션을 호출합니다.
 * @author 홍규진
 */
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

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert('입력 오류', '워크스페이스 이름을 입력해주세요.');
      return false;
    }
    if (!desc.trim()) {
      Alert.alert('입력 오류', '워크스페이스 설명을 입력해주세요.');
      return false;
    }
    if (!image) {
      Alert.alert('입력 오류', '워크스페이스 이미지를 선택해주세요.');
      return false;
    }
    return true;
  };

  const handleCreateWorkspace = () => {
    if (!validateInputs()) {
      return;
    }
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
