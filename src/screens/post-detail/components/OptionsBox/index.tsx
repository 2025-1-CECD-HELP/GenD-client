import React from 'react';
import {OptionItem, OptionBox, OptionText} from './index.style';
import {Divider} from '@/screens/write/index.style';
import {Post} from '@/services/post/types';
import {useDeletePostMutation} from '@/screens/home/hooks/usePostMutation';

interface OptionsBoxProps {
  isAdmin: boolean;
  post: Post;
  onClose: () => void;
}

const OptionsBox: React.FC<OptionsBoxProps> = ({post, isAdmin, onClose}) => {
  const {deletePostMutation} = useDeletePostMutation();
  return (
    <OptionBox>
      {isAdmin ? (
        <>
          <OptionItem
            onPress={() => {
              //TODO-수정 로직 구현 필요
              console.log('수정', post.postId);
              onClose();
            }}>
            <OptionText>수정</OptionText>
          </OptionItem>
          <Divider />
          <OptionItem
            onPress={() => {
              deletePostMutation({postId: post.postId});
              onClose();
            }}>
            <OptionText>삭제</OptionText>
          </OptionItem>
          <Divider />
          <OptionItem
            onPress={() => {
              //TODO-공유하기 로직 딥링크를 통한 구현 필요
              console.log('공유하기');
              onClose();
            }}>
            <OptionText>공유하기</OptionText>
          </OptionItem>
        </>
      ) : (
        <>
          <OptionItem
            onPress={() => {
              //TODO-공유하기 로직 딥링크를 통한 구현 필요
              console.log('공유하기');
              onClose();
            }}>
            <OptionText>공유하기</OptionText>
          </OptionItem>
          <Divider />
          <OptionItem
            onPress={() => {
              //TODO-신고하기 로직 구현 필요
              console.log('신고하기', post.postId);
              onClose();
            }}>
            <OptionText>신고하기</OptionText>
          </OptionItem>
        </>
      )}
    </OptionBox>
  );
};

export default OptionsBox;
