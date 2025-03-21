import React from 'react';
import {
  CenterButton,
  CenterButtonContainer,
  ItemTitle,
  NavContainer,
  NavItem,
} from './index.style';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  HomeIcon,
  FileIcon,
  CalendarIcon,
  MypageIcon,
  LogoIcon,
} from '@assets/images/svg/bottom-navigator/index';
/**
 * 바텀 탭 네비게이터입니다.
 * 입력받은 라우트 이름을 통해 탭 버튼을 표시합니다.
 * 미팅 탭은 중앙에 표시됩니다.(미팅 탭은 라우트 이름이 MEETING 입니다.)
 * @author 홍규진
 */
const BottomNavigator: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <NavContainer>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <NavItem key={route.key} active={isFocused} onPress={onPress}>
            <TabIcon routeName={route.name} isActive={isFocused} />
            <ItemTitle active={isFocused}>
              {label == 'MEETING' ? null : label}
            </ItemTitle>
          </NavItem>
        );
      })}
      <CenterButtonContainer>
        <CenterButton onPress={() => navigation.navigate('MEETING')}>
          <LogoIcon width={28} height={28} />
        </CenterButton>
      </CenterButtonContainer>
    </NavContainer>
  );
};

/**
 * 탭 아이콘 컴포넌트입니다.
 * 탭 아이콘은 탭 버튼을 표시합니다.
 * @author 홍규진
 */

interface TabIconProps {
  routeName: string;
  isActive: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({routeName, isActive}) => {
  // 활성/비활성 상태에 따른 색상 설정
  const fillColor = isActive ? '#007AFF' : '#8E8E93';
  // 라우트 이름에 따라 적절한 아이콘 반환
  switch (routeName) {
    case 'HOME':
      return <HomeIcon fill={fillColor} width={24} height={24} />;
    case 'FILE':
      return <FileIcon fill={fillColor} width={24} height={24} />;
    case 'CALENDAR':
      return <CalendarIcon fill={fillColor} width={24} height={24} />;
    case 'MYPAGE':
      return <MypageIcon fill={fillColor} width={24} height={24} />;
    case 'MEETING':
      return null;
    default:
      return null;
  }
};

export default BottomNavigator;
