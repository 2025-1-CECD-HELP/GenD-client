import React from 'react';
import {ActivityIndicator} from 'react-native';
import {
  LoadingContainer,
  PulsingContainer,
  Subtitle,
  Title,
  LoadingText,
} from './AdaptiveLoadingFallbackUI.style';
import {useThemeColors} from '@/contexts/theme/ThemeContext';

/**
 * 로딩 시간에 따른 다양한 LoadingFallback 컴포넌트
 * 로딩 시간에 따라서 각기 다른 로딩 화면을 보여줍니다.
 * 시간별로 로딩 화면을 커스텀할 수 있도록 합니다.
 * 다만 30초 이상의 로딩 시에는 다른 방안을 대입해야만 합니다.
 * @author 홍규진
 */

const ShortLoadingFallback = () => {
  const {textPrimary} = useThemeColors();
  return (
    <LoadingContainer>
      <ActivityIndicator size="small" color={textPrimary} />
      <LoadingText>잠시만 기다려주세요...</LoadingText>
    </LoadingContainer>
  );
};

const LongLoadingFallback = () => {
  const {textPrimary} = useThemeColors();
  return (
    <PulsingContainer>
      <ActivityIndicator size="large" color={textPrimary} />
      <Title>데이터를 불러오는 중입니다</Title>
      <Subtitle>조금 시간이 걸릴 수 있습니다. 잠시만 기다려주세요.</Subtitle>
    </PulsingContainer>
  );
};

const AdaptiveLoadingFallback = () => {
  const [loadingTime, setLoadingTime] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setLoadingTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loadingTime < 3) {
    return <ShortLoadingFallback />;
  } else {
    return <LongLoadingFallback />;
  }
};

export default AdaptiveLoadingFallback;
