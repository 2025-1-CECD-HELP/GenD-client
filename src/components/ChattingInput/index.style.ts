import styled from '@emotion/native';
export const Container = styled.View`
  display: flex;
  flex-direction: row;

  background-color: ${({theme}) => theme.colors.background};
  padding: 10px;
  margin-bottom: 10px;
  height: 60px;
`;
export const InputContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 25px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.textDisabled};
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const InputField = styled.TextInput`
  flex: 1;
  ${({theme}) => theme.fonts.text2};
  padding-left: 20px;
  padding-bottom: 8px;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const IconContainer = styled.TouchableOpacity`
  padding: 8px;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-self: center;
  align-content: center;
  justify-items: center;
`;
