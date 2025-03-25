import styled from '@emotion/native';

// 헤더 컨테이너
export const HeaderContainer = styled.View`
  height: 95px;
  padding-top: 44px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 24px;
  background-color: ${({theme}) => theme.colors.background};
`;

// 로고 컨테이너
export const LogoContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

// 오른쪽 아이콘 컨테이너
export const RightContainer = styled.View`
  flex-direction: row;
  align-items: right;
  gap: 12px;
`;

// 아이콘 버튼
export const IconButton = styled.TouchableOpacity`
  padding: 8px;
`;

// GD 로고 컨테이너
export const GDLogoContainer = styled.TouchableOpacity`
  position: relative;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

// 중첩 아이콘 컨테이너
export const StackedIconsContainer = styled.View`
  position: relative;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

// 아이콘 래퍼 기본 스타일
export const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

// 첫 번째 아이콘 (맨 뒤)
export const IconOne = styled(IconWrapper)`
  z-index: 1;
  transform: translateX(-8px);
  background-color: ${({theme}) => theme.colors.backgroundBase};
  border-radius: 12px;
`;

// 두 번째 아이콘 (중간)
export const IconTwo = styled(IconWrapper)`
  z-index: 2;
  background-color: ${({theme}) => theme.colors.backgroundBase};
  border-radius: 12px;
`;

// 세 번째 아이콘 (맨 앞)
export const IconThree = styled(IconWrapper)`
  z-index: 3;
  transform: translateX(8px);
  background-color: ${({theme}) => theme.colors.blue};

  border-color: ${({theme}) => theme.colors.background};
  border-radius: 12px;
`;
