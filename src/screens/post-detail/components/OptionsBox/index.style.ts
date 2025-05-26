// 스타일 예시 (emotion)
import styled from '@emotion/native';

export const OptionBox = styled.View`
  position: absolute;
  top: 28px;
  right: 0;
  background: ${({theme}) => theme.colors.backgroundElevated};
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
  padding: 8px 0;
  z-index: 10;
  min-width: 80px;
`;

export const OptionItem = styled.TouchableOpacity`
  padding: 10px 20px;
`;

export const OptionText = styled.Text`
  text-align: center;
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: 15px;
`;
