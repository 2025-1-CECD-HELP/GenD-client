import styled from '@emotion/native';

export const Container = styled.TouchableOpacity`
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

export const Card = styled.View`
  background: #f7f8fa;
  border-radius: 16px;
  align-items: center;
  margin-bottom: 20px;
  padding: 18px 0 10px 0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
`;

export const IconWrapper = styled.View`
  margin-bottom: 8px;
`;

export const FolderName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const ItemCount = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.colors.textDisabled};
  margin-top: 2px;
`;
