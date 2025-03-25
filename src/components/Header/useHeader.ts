// useHeader.ts
import {useCallback} from 'react';
import {useTheme} from '@/contexts/theme/ThemeContext';

/**
 * 헤더 컴포넌트에 필요한 로직을 작성합니다.
 * 관심사 분리를 위해서, 헤더 컴포넌트에 필요한 로직들만 분리합니다.
 * @author 홍규진
 */
interface UseHeaderProps {
  onNotificationPress?: () => void;
  onWorkSpacePress?: () => void;
  onLogoPress?: () => void;
  onDarkLightLogoPress?: () => void;
}

export const useHeader = ({
  onNotificationPress,
  onWorkSpacePress,
  onLogoPress,
  onDarkLightLogoPress,
}: UseHeaderProps) => {
  const {colors, toggleTheme, isDarkMode} = useTheme();

  // 여기에 추가적인 상태나 로직을 구현할 수 있습니다

  // 필요한 핸들러 함수들
  const handleNotificationPress = useCallback(() => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      console.log('알림 클릭 이벤트가 없습니다.');
    }
  }, [onNotificationPress]);

  // 다크 라이트 로고 클릭 이벤트 처리
  const handleDarkLightLogoPress = useCallback(() => {
    if (onDarkLightLogoPress) {
      onDarkLightLogoPress();
    } else {
      toggleTheme();
    }
  }, [onDarkLightLogoPress, toggleTheme]);

  // 워크스페이스 관련 로직 처리
  const handleWorkSpacePress = useCallback(() => {
    if (onWorkSpacePress) {
      onWorkSpacePress();
    } else {
      console.log('워크스페이스 클릭 이벤트가 없습니다.');
    }
  }, [onWorkSpacePress]);

  // 로고 관련 로직 처리
  const handleLogoPress = useCallback(() => {
    if (onLogoPress) {
      onLogoPress();
    } else {
      console.log('로고 클릭 이벤트가 없습니다.');
    }
  }, [onLogoPress]);

  return {
    colors,
    isDarkMode,
    handleNotificationPress,
    handleWorkSpacePress,
    handleLogoPress,
    handleDarkLightLogoPress,
    // 추가적인 상태나 함수들을 여기서 반환
  };
};
