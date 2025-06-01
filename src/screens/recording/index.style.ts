import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({theme}) => theme.colors.background};
  padding: 24px 0;
  position: relative;
`;
export const LoadingText = styled.Text`
  ${({theme}) => theme.fonts.title1};
  color: ${({theme}) => theme.colors.textPrimary};
`;
export const Title = styled.Text`
  ${({theme}) => theme.fonts.title2};
  color: ${({theme}) => theme.colors.textPrimary};
  margin-top: 8px;
`;

export const Timer = styled.Text`
  width: 90%;
  font-size: 36px;
  font-weight: bold;
  margin: 32px 0 0 0;
  font-family: 'Menlo';
  text-align: center;
  color: ${({theme}) => theme.colors.textPrimary};

  letter-spacing: 2px;
`;
export const STTTextContainer = styled.View`
  width: 90%;
  min-height: 100px;
  max-height: 300px;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
  /* overflow: hidden; // 필요시 추가 */
`;
export const STTText = styled.Text`
  ${({theme}) => theme.fonts.text1};
  color: ${({theme}) => theme.colors.textPrimary};
  min-height: 60px;
  text-align: left; /* 왼쪽 정렬로 자연스럽게 */
  margin: 16px 0;
  flex-shrink: 1;
  flex-wrap: wrap;
`;

export const Guide = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 24px;
`;

export const ButtonsContainer = styled.View<{isRecording: boolean}>`
  position: absolute;
  bottom: 150px;
  width: 70%;
  flex-direction: row;
  align-items: center;
  justify-content: ${({isRecording}) =>
    isRecording ? 'space-between' : 'center'};
`;

export const MicButton = styled.TouchableOpacity<{isRecording: boolean}>`
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 40px;
  background-color: ${props =>
    props.isRecording ? props.theme.colors.blue : props.theme.colors.red};
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  z-index: 1;
`;

export const MicIcon = styled.View<{isRecording: boolean}>`
  width: 40px;
  height: 40px;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 20px;
  transform: ${props => (props.isRecording ? 'scale(1.1)' : 'scale(1)')};
  transition: all 0.3s ease-in-out;
`;

export const MsText = styled.Text`
  min-width: 20px;
  display: inline-block;
`;

export const ErrorText = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 16px;
`;

export const WaveformContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  height: 100px;
  width: 90%;
  background-color: ${({theme}) => theme.colors.backgroundElevated};
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  border: 1px solid ${({theme}) => theme.colors.blue};
  position: relative;
`;

export const WaveformBar = styled.View<{amp: number}>`
  width: 3px;
  height: 10px;
  background-color: ${({theme}) => theme.colors.blue};
  margin-horizontal: 1px;
  border-radius: 2px;
  opacity: ${({amp}) => 0.4 + 0.6 * (amp / 100)};
`;
