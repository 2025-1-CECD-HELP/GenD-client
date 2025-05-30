// useHeader.ts
import {useCallback} from 'react';
import {useTheme} from '@/contexts/theme/ThemeContext';
import {useWorkspaceListQuery} from '@/screens/home/hooks/useWorkspaceQuery';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {useWorkspaceBottomSheet} from '@/hooks/useWorkspaceBottomSheet';
/**
 * 헤더 컴포넌트에 필요한 로직을 작성합니다.
 * 관심사 분리를 위해서, 헤더 컴포넌트에 필요한 로직들만 분리합니다.
 * @author 홍규진
 */

export const useHeader = () => {
  const {colors, toggleTheme, isDarkMode} = useTheme();
  const {data} = useWorkspaceListQuery();
  const navigation = useTypeSafeNavigation();
  const {handleOpenBottomSheet} = useWorkspaceBottomSheet();

  const handleWorkSpacePress = useCallback(() => {
    handleOpenBottomSheet();
  }, [handleOpenBottomSheet]);

  const handleNotificationPress = useCallback(() => {
    navigation.navigate('ALERT_LIST', {});
  }, [navigation]);

  const handleLogoPress = useCallback(() => {
    navigation.navigate('LANDING', {isInit: false});
  }, [navigation]);

  const handleDarkLightLogoPress = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return {
    colors,
    isDarkMode,
    handleNotificationPress,
    handleWorkSpacePress,
    handleLogoPress,
    handleDarkLightLogoPress,
    workspaceList: data?.workspaceList,
  };
};
