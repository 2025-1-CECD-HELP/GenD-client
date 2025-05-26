import React from 'react';
import {
  HeaderContainer,
  LeftContainer,
  LogoContainer,
  RightContainer,
  IconButton,
  GDLogoContainer,
  StackedIconsContainer,
  ThumbnailImage,
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

/**
 * 헤더 컴포넌트입니다.
 * 헤더 컴포넌트의 UI 만을 위한 로직들을 관리합니다.
 * 기능을 위한 로직은 useHeader.ts 파일에 작성합니다.
 * @author 홍규진
 */
export const Header: React.FC = () => {
  const {
    colors,
    handleNotificationPress,
    handleWorkSpacePress,
    handleLogoPress,
    handleDarkLightLogoPress,
    isDarkMode,
    workspaceList,
  } = useHeader();

  /**
   * 워크스페이스 정보가 없으면 워크스페이스 선택 화면으로 이동합니다.
   * 헤더가 렌더링되기 전에 워크스페이스 정보가 없으면 워크스페이스 선택 화면으로 이동합니다.
   * @author 홍규진
   */

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
        <GDLogoContainer onPress={handleWorkSpacePress}>
          {workspaceList.length > 0 ? (
            <StackedIconsContainer>
              {workspaceList.length >= 3 && (
                <IconOne onPress={handleWorkSpacePress}>
                  <ThumbnailImage source={{uri: workspaceList[2].imageUrl}} />
                </IconOne>
              )}
              {workspaceList.length >= 2 && (
                <IconTwo>
                  <ThumbnailImage source={{uri: workspaceList[1].imageUrl}} />
                </IconTwo>
              )}
              <IconThree onPress={handleWorkSpacePress}>
                <ThumbnailImage source={{uri: workspaceList[0].imageUrl}} />
              </IconThree>
            </StackedIconsContainer>
          ) : (
            <IconButton onPress={handleWorkSpacePress}>
              {defaultIcon}
            </IconButton>
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
