// src/components/OptionsBox/index.tsx
import React, {useEffect} from 'react';
import {
  Container,
  OptionItem,
  OptionText,
  Divider,
  Wrapper,
} from './index.style';
import {View, LayoutRectangle} from 'react-native';

export type Option = {
  label: string;
  onPress: () => void;
  color?: string;
};

type OptionsBoxProps = {
  visible: boolean;
  onClose: () => void;
  options: Option[];
  menuRef: React.RefObject<View | null>;
  isFile: boolean;
};

export const OptionsBox = ({
  visible,
  onClose,
  options,
  menuRef,
  isFile,
}: OptionsBoxProps) => {
  const [menuLayout, setMenuLayout] = React.useState<LayoutRectangle | null>(
    null,
  );

  useEffect(() => {
    console.log('visible', visible);
    console.log('isFile ', isFile);
    if (visible && menuRef.current) {
      console.log('menuRef.current', menuRef.current);
      menuRef.current.measure((x, y, width, height, pageX, pageY) => {
        setMenuLayout({x: pageX, y: pageY, width, height});
      });
    }
  }, [visible, menuRef, isFile]);

  if (!visible || !menuLayout) {
    return null;
  }

  return (
    <Wrapper onPress={onClose} menuLayout={menuLayout} isFile={isFile}>
      <Container isFile={isFile}>
        {options.map((option, index) => (
          <React.Fragment key={option.label}>
            <OptionItem
              onPress={e => {
                e.stopPropagation();
                option.onPress();
              }}>
              <OptionText style={{color: option.color}}>
                {option.label}
              </OptionText>
            </OptionItem>
            {index < options.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Container>
    </Wrapper>
  );
};
