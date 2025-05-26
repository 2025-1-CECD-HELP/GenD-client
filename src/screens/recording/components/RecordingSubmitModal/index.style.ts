import styled from '@emotion/native';

export const SubmitFormContainer = styled.View`
  width: 100%;
`;

export const SubmitInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.divider};
  font-size: 16px;
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 18px;
  padding: 6px 0;
`;

export const SubmitRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const SubmitLabel = styled.Text<{selected?: boolean}>`
  flex: 1;
  color: ${({theme, selected}) =>
    selected ? theme.colors.blue : theme.colors.textSecondary};
  font-weight: ${({selected}) => (selected ? 'bold' : 'normal')};
  font-size: 15px;
`;

export const SubmitDropdown = styled.TouchableOpacity`
  flex: 2;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.divider};
  padding: 6px 0;
`;
