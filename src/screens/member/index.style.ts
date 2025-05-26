import styled from '@emotion/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const TopBarContainer = styled.View`
  padding: 20px 20px 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const SearchBarWrapper = styled.View`
  flex: 1;
  align-items: center;
`;
export const PlusButtonWrapper = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.blue};
  border-radius: 50px;
  padding: 16px;
`;

export const MemberList = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

export const MemberItem = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.colors.backgroundElevated};
  border-radius: 16px;
  margin-bottom: 12px;
  padding: 16px;
`;
