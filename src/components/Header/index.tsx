import React from 'react';
import {
  HeaderContainer,
  LeftContainer,
  LogoContainer,
  RightContainer,
  IconButton,
  GDLogoContainer,
  StackedIconsContainer,
  IconOne,
  IconTwo,
  IconThree,
  DarkLightLogoContainer,
} from './index.style';

import {
  AppLogo,
  AlertIcon,
  DarkLogo,
  LightLogo,
} from '@assets/images/svg/header';
import {useHeader} from './useHeader';

interface IHeaderProps {
  onNotificationPress?: () => void;
  onWorkSpacePress?: () => void;
  onLogoPress?: () => void;
  onDarkLightLogoPress?: () => void;
  profileIcons?: React.ReactNode[]; // 프로필에 표시할 아이콘 배열
}

/**
 * 헤더 컴포넌트입니다.
 * 헤더 컴포넌트의 UI 만을 위한 로직들을 관리합니다.
 * 기능을 위한 로직은 useHeader.ts 파일에 작성합니다.
 * @author 홍규진
 */
export const Header: React.FC<IHeaderProps> = ({
  onNotificationPress,
  onWorkSpacePress,
  onLogoPress,
  onDarkLightLogoPress,
  profileIcons = [],
}) => {
  const {
    colors,
    handleNotificationPress,
    handleWorkSpacePress,
    handleLogoPress,
    handleDarkLightLogoPress,
    isDarkMode,
  } = useHeader({
    onNotificationPress,
    onWorkSpacePress,
    onLogoPress,
    onDarkLightLogoPress,
  });

  const defaultIcon = (
    <IconThree onPress={handleWorkSpacePress}>
      <AppLogo fill={colors.white} width={21} height={21} />
    </IconThree>
  );

  return (
    <HeaderContainer>
      <LeftContainer>
        <DarkLightLogoContainer onPress={handleDarkLightLogoPress}>
          {isDarkMode ? <LightLogo /> : <DarkLogo />}
        </DarkLightLogoContainer>
        <LogoContainer onPress={handleLogoPress}>
          <AppLogo fill={colors.textPrimary} width={58} height={23} />
        </LogoContainer>
      </LeftContainer>
      <RightContainer>
        <IconButton>{/* 흑백 테마 전환 아이콘 */}</IconButton>
        <GDLogoContainer onPress={handleWorkSpacePress}>
          {profileIcons.length > 0 ? (
            <StackedIconsContainer>
              {profileIcons.length >= 3 && <IconOne>{profileIcons[2]}</IconOne>}
              {profileIcons.length >= 2 && <IconTwo>{profileIcons[1]}</IconTwo>}
              <IconThree>{profileIcons[0]}</IconThree>
            </StackedIconsContainer>
          ) : (
            <IconButton>{defaultIcon}</IconButton>
          )}
        </GDLogoContainer>

        <IconButton onPress={handleNotificationPress}>
          <AlertIcon
            fill={colors.textPrimary}
            stroke={colors.textPrimary}
            strokeOpacity={1}
            strokeWidth={1.6335}
            width={21}
            height={21}
          />
        </IconButton>
      </RightContainer>
    </HeaderContainer>
  );
};
