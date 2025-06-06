import React from 'react';
import {
  Container,
  Title,
  Timer,
  Guide,
  MicButton,
  MsText,
  ErrorText,
  LoadingText,
  ButtonsContainer,
  WaveformContainer,
} from './index.style';
import {formatTime} from './utils/formatTime';
import {useRecord} from './hooks/useRecord';
import {
  MicIcon,
  PauseIcon,
  ResumeIcon,
  StopIcon,
} from '../../assets/images/svg/meeting';
import {PulseRing} from './components/Pursering';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {View} from 'react-native';
import {useRecordSubmit} from './hooks/useRecordSubmit';
import {LoadingFallbackUI} from '@/components/FallBackUI/Loading';

export const RecordingScreen = () => {
  const {
    isRecording,
    isPaused,
    timer,
    handleMicPress,
    pauseRecording,
    resumeRecording,
    stopRecording,
    isReady,
    error,
    waveform,
  } = useRecord();
  const {m, s, msStr} = formatTime(timer);
  const {textPrimary} = useThemeColors();
  const {handleStopRecording, isLoading} = useRecordSubmit();

  // 0. 녹음 기능 초기화 중
  if (!isReady) {
    return (
      <Container>
        <LoadingText>녹음 기능을 초기화하는 중입니다...</LoadingText>
      </Container>
    );
  }

  // 1. 녹음 중지 버튼 눌렀을 때
  const onStopRecording = async () => {
    if (isPaused) {
      await resumeRecording();
    }
    const path = await stopRecording();

    // 레코딩 후 결과의 데이터가 있으면, 모달 띄우기
    if (path) {
      await handleStopRecording(path);
    }
  };

  // 파형 바 스타일 계산 함수 (이상하게 @emotion/native 에서는 디자인이 적용이 안 됨.)
  const getBarStyle = (amp: number) => ({
    width: 3,
    height: Math.min(100, Math.max(10, amp)),
    backgroundColor: textPrimary,
    marginHorizontal: 1,
    borderRadius: 2,
    opacity: 0.4 + 0.6 * (amp / 100),
  });

  if (isLoading) {
    return (
      <Container>
        <LoadingFallbackUI />
      </Container>
    );
  }
  return (
    <Container>
      <Title>회의 시작하기</Title>
      {error && <ErrorText>{error.message}</ErrorText>}
      <Timer>
        {m} : {s} : <MsText>{msStr}</MsText>
      </Timer>

      <Guide>
        {isRecording
          ? '녹음이 진행 중입니다. 버튼을 누르면 녹음이 종료됩니다.'
          : '버튼을 누르면 회의 녹음이 시작됩니다.'}
      </Guide>

      {isRecording && (
        <WaveformContainer>
          {waveform.slice(-50).map((amp, idx) => (
            <View key={idx} style={getBarStyle(amp)} />
          ))}
        </WaveformContainer>
      )}

      <ButtonsContainer isRecording={isRecording}>
        {isRecording && !isPaused && (
          <PauseIcon color={textPrimary} onPress={pauseRecording} />
        )}
        {isRecording && isPaused && (
          <ResumeIcon
            color={textPrimary}
            onPress={resumeRecording}
            width={34}
            height={34}
          />
        )}
        <MicButton
          onPress={isRecording ? undefined : handleMicPress}
          isRecording={isRecording}>
          <PulseRing
            isRecording={isRecording}
            isPaused={isPaused}
            delay={0}
            size={100}
            color="#A3A3FF"
          />
          <PulseRing
            isRecording={isRecording}
            isPaused={isPaused}
            delay={0.6}
            size={150}
            color="#A3A3FF"
          />
          <PulseRing
            isRecording={isRecording}
            isPaused={isPaused}
            delay={1.2}
            size={200}
            color="#A3A3FF"
          />
          <MicIcon width={40} height={40} />
        </MicButton>
        {isRecording && (
          <StopIcon onPress={onStopRecording} color={textPrimary} />
        )}
      </ButtonsContainer>
    </Container>
  );
};
