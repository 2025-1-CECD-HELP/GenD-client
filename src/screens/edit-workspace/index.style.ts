import styled from '@emotion/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  padding: 20px 24px;
`;

export const Title = styled.Text`
  ${({theme}) => theme.fonts.title2};
  color: ${({theme}) => theme.colors.textPrimary};
  text-align: center;
  margin-bottom: 8px;
`;

export const ImageWrapper = styled.View`
  align-items: center;
  margin-top: 40px;
  margin-bottom: 24px;
`;

export const ProfileCircle = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${({theme}) => theme.colors.white};
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
`;

export const ProfileText = styled.Text`
  ${({theme}) => theme.fonts.title1};
  color: ${({theme}) => theme.colors.white};
`;

export const SelectPhoto = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.blue};
  text-align: center;
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 8px;
  margin-top: 16px;
`;

export const Input = styled.TextInput`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.divider};
  padding: 8px 0;
  margin-bottom: 4px;
`;

export const InputCount = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
  text-align: right;
  margin-bottom: 8px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.blue};
  margin-top: 30px;
  border-radius: 24px;
  height: 52px;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  ${({theme}) => theme.fonts.title3};
  color: ${({theme}) => theme.colors.white};
`;

export const DeleteButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.red};
  margin-top: 30px;
  border-radius: 24px;
  height: 52px;
  align-items: center;
  justify-content: center;
`;
