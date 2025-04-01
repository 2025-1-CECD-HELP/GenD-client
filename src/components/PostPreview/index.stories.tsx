import type {Meta, StoryObj} from '@storybook/react';
import {View} from 'react-native';
import {PostPreview} from './index';

/**
 * 게시글 프리뷰 컴포넌트 스토리입니다.
 * 그림자를 보여주기 위해 스토리 바깥에 View를 하나 더 씌운 뒤 패딩값을 추가하였습니다.
 * @author 이정선
 */

const meta = {
  title: 'components/PostPreview',
  component: PostPreview,
  decorators: [
    Story => {
      return <View style={{padding: 20, flex: 1}}>{Story()}</View>;
    },
  ],
} satisfies Meta<typeof PostPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

// 고정되어 있고, 이미지가 있는 게시글의 프리뷰
export const PinnedWithImage: Story = {
  args: {
    title: '게시글의 제목',
    description:
      '이번 주 워크샵은 금요일 오후 2시에 진행될 예정입니다. 장소는 5층 대회의실이며, 발표 자료와 아이디어 공유를 중심으로 구성됩니다. 참석자분들을 위해 간단한 다과도 준비할 예정이니 많은 참여 부탁드립니다!',
    writer: '작성자',
    imageUrl:
      'https://img.freepik.com/free-photo/group-casually-dressed-business-people-discussing-ideas-office_7861-1634.jpg?t=st=1743401160~exp=1743404760~hmac=70352676a3f4a5124aa04f3fe77d9a7d2184b9f92b06c23148647b808a4959d8&w=2000',
    isPin: true,
  },
};

// 고정되어 있고, 이미지가 없는 게시글의 프리뷰
export const PinnedWithoutImage: Story = {
  args: {
    title: '게시글의 제목',
    description:
      '팀 디자인 시스템이 새롭게 정비되었습니다. 컴포넌트 네이밍 규칙, 컬러 팔레트, 마진·패딩 간격 등 실무 적용에 필요한 기준들이 정리되어 있어요. 개발, 디자인 모두 적용 필수이니 반드시 한번 읽어봐주세요.',
    writer: '작성자',
    isPin: true,
  },
};

// 고정되어 있지 않고, 이미지가 있는 게시글의 프리뷰
export const UnpinnedWithImage: Story = {
  args: {
    title: '게시글의 제목',
    description:
      '지난 프로젝트 마무리 회의에서 나온 회고 내용을 문서로 정리했습니다. 좋았던 점, 개선할 점, 다음 프로젝트에 반영해야 할 사항들을 중심으로 정리했어요. 내용 확인하시고, 빠진 부분이나 의견 있으면 댓글 남겨주세요!',
    writer: '작성자',
    imageUrl:
      'https://img.freepik.com/free-photo/group-casually-dressed-business-people-discussing-ideas-office_7861-1634.jpg?t=st=1743401160~exp=1743404760~hmac=70352676a3f4a5124aa04f3fe77d9a7d2184b9f92b06c23148647b808a4959d8&w=2000',
    isPin: false,
  },
};

// 고정되어 있지 않고, 이미지가 없는 게시글의 프리뷰
export const UnpinnedWithoutImage: Story = {
  args: {
    title: '게시글의 제목',
    description:
      '다음 주 팀 미팅에서는 진행 중인 업무 외에도 새로운 기획안 브레인스토밍이 포함될 예정입니다. 각자 생각해온 아이디어를 자유롭게 정리해서 공유해주세요. 간단한 키워드만 적어도 좋고, 참고 자료 링크도 함께 주시면 더 좋아요!',
    writer: '작성자',
    isPin: false,
  },
};
