import styled from '@emotion/native';

export const Container = styled.View`
  padding: 20px 10px 12px 10px;
  background-color: ${({theme}) => theme.colors.background};
  width: 100%;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  ${({theme}) => theme.fonts.title2};
  text-align: center;
  margin-left: 20px;
`;

export const ReasonContainer = styled.View`
  width: 100%;
  padding: 20px 0;
`;

export const ReasonButton = styled.TouchableOpacity<{selected: boolean}>`
  background-color: ${({selected, theme}) =>
    selected ? theme.colors.blueSecondary : 'transparent'};
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;
`;

export const ReasonContent = styled.Text`
  ${({theme}) => theme.fonts.text1};
  color: ${({theme}) => theme.colors.textPrimary};
`;
