import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IconButtonRow, IconButtonText} from './index.style';

interface IconButtonProps {
  icon: React.ReactNode;
  text: string;
  onPress?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  text,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <IconButtonRow>
      {icon}
      <IconButtonText>{text}</IconButtonText>
    </IconButtonRow>
  </TouchableOpacity>
);
