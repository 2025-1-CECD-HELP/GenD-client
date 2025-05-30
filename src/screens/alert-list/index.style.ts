import styled from '@emotion/native';
import {FlatList} from 'react-native';
import {Alert} from '@/atoms/alert';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const AlertList = styled(FlatList<Alert>)`
  flex: 1;
  padding: 16px;
`;

export const AlertItem = styled.View`
  background-color: ${props => props.theme.colors.backgroundBase};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const AlertTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 8px;
`;

export const AlertContent = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 8px;
`;

export const AlertTime = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  align-self: flex-end;
`;

export const EmptyView = styled.Text`
  text-align: center;
  margin-top: 20px;
  color: ${props => props.theme.colors.textDisabled};
`;
