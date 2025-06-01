import React from 'react';
import {Share} from 'react-native';
import {OptionItem, OptionBox, OptionText} from './index.style';
import {Divider} from '@/screens/write/index.style';
import {Post} from '@/services/post/types';
import {useDeletePostMutation} from '@/screens/home/hooks/usePostMutation';
import {useReportBottomSheet} from '../../hooks/useReportBottomSheet';

interface OptionsBoxProps {
  isAdmin: boolean;
  post: Post;
  onClose: () => void;
}

const OptionsBox: React.FC<OptionsBoxProps> = ({post, isAdmin, onClose}) => {
  const {deletePostMutation} = useDeletePostMutation();
  const {openReportSheet} = useReportBottomSheet();

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${post.postTitle}\n\n${post.postDescription}\n\nGenD에서 더 많은 내용을 확인하세요!`,
        title: post.postTitle,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // 공유 성공
          console.log('공유 성공:', result.activityType);
        } else {
          // 공유 성공 (activityType 없음)
          console.log('공유 성공');
        }
      } else if (result.action === Share.dismissedAction) {
        // 공유 취소
        console.log('공유 취소');
      }
    } catch (error) {
      console.error('공유 중 오류 발생:', error);
    }
    onClose();
  };

  const handleReport = () => {
    onClose();
    openReportSheet(reason => {
      console.log(`"${reason}"로 ${post.postId} 신고`);
    });
  };

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
          <OptionItem onPress={handleShare}>
            <OptionText>공유하기</OptionText>
          </OptionItem>
        </>
      ) : (
        <>
          <OptionItem onPress={handleShare}>
            <OptionText>공유하기</OptionText>
          </OptionItem>
          <Divider />
          <OptionItem onPress={handleReport}>
            <OptionText>신고하기</OptionText>
          </OptionItem>
        </>
      )}
    </OptionBox>
  );
};

export default OptionsBox;
