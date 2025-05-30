import styled from '@emotion/native';

export const Container = styled.View<{isFile: boolean}>`
  flex: 1;
  border-radius: 13px;
  border: 1px solid ${({theme}) => theme.colors.divider};
  background-color: ${({theme}) => theme.colors.background};
  overflow: hidden;
  width: 100%;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({theme}) => theme.colors.divider};
`;

export const FormatPreview = styled.TouchableOpacity`
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
`;

export const ContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: ${({theme}) => theme.colors.backgroundBase};
`;

export const Title = styled.Text`
  ${({theme}) => theme.fonts.title5};
  color: ${({theme}) => theme.colors.textPrimary};
`;
