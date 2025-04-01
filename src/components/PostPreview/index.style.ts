import styled from '@emotion/native';
import {Platform} from 'react-native';

export const Container = styled.View(({theme}) => ({
  width: '100%',
  padding: 20,
  borderRadius: 12,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  backgroundColor: theme.colors.backgroundBase,
  ...(Platform.OS === 'ios'
    ? {
        shadowColor: theme.colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: {width: 0, height: 0},
      }
    : {
        elevation: 5,
      }),
}));

export const ImagePreview = styled.Image`
  width: 95px;
  height: 95px;
`;

export const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
`;

export const PostTitle = styled.Text`
  ${({theme}) => theme.fonts.title5};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const PostContent = styled.Text`
  ${({theme}) => theme.fonts.text4};
  color: ${({theme}) => theme.colors.textSecondary};
  flex-shrink: 1;
`;

export const Writer = styled.Text`
  ${({theme}) => theme.fonts.text4};
  color: ${({theme}) => theme.colors.textSecondary};
`;
