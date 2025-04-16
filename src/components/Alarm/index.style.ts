import styled from '@emotion/native';

export const Container = styled.View<{
  isNew: boolean;
}>`
  background-color: ${({theme, isNew}) =>
    isNew ? theme.colors.backgroundSelected : theme.colors.background};
  height: auto;
  display: flex;
  flex-direction: row;
  padding: 12px;
  gap: 20px;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const ImageContainer = styled.View`
  aspect-ratio: 1 / 1;
  border-radius: 50px;
  width: 60px;
  object-fit: cover;
  overflow: hidden;
`;

export const WorkspaceProfile = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const Title = styled.Text`
  ${({theme}) => theme.fonts.title5};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const Content = styled.Text`
  ${({theme}) => theme.fonts.text4};
  color: ${({theme}) => theme.colors.textSecondary};
  flex-shrink: 1;
`;

export const Time = styled.Text`
  ${({theme}) => theme.fonts.text4};
  position: absolute;
  top: 12px;
  right: 12px;
  color: ${({theme}) => theme.colors.textSecondary};
`;
