import React from 'react';
import {Container, MenuContainer, MenuText, Divider} from './index.style';
import {Menu} from './index.type';
import {ViewStyle} from 'react-native';

/**
 * 공통 드롭다운 메뉴 컴포넌트 입니다.
 * 메뉴 개수에 따라 레이아웃이 유동적으로 조정됩니다.
 * 각 메뉴는 isDelete, isDownload props를 통해 스타일이 달라집니다.
 * - 삭제하기 메뉴는 빨간색으로 표시
 * - 다운로드 메뉴는 파란색으로 표시
 * @author 이정선
 */

export type MenuProps = {
  menus: Menu[];
  style?: ViewStyle;
};

export const DropDownMenu = ({menus, style}: MenuProps) => (
  <Container style={style}>
    {menus.map((menu, index) => (
      <React.Fragment key={index}>
        <MenuContainer activeOpacity={0.9} onPress={menu.onPress}>
          <MenuText
            color={
              menu.isDelete ? 'red' : menu.isDownload ? 'blue' : 'textPrimary'
            }>
            {menu.label}
          </MenuText>
        </MenuContainer>
        {index !== menus.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </Container>
);
