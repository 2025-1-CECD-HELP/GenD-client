import styled from '@emotion/native';

export const NavContainer = styled.View`
  flex-direction: row;
  height: 100px;
  justify-content: space-around;
  background-color: ${props => props.theme.colors.background};
  align-items: center;
  position: relative;
  z-index: 33;
  padding-bottom: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
`;

export const NavItem = styled.TouchableOpacity<{active: boolean}>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
`;

export const ItemTitle = styled.Text<{active: boolean}>`
  font-size: 12px;
  margin-top: 4px;
  color: ${props =>
    props.active ? props.theme.colors.blue : props.theme.colors.textDisabled};
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
`;

export const CenterButtonContainer = styled.View`
  position: absolute;
  width: 90px;
  height: 90px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 60px;
  justify-content: center;
  top: -25px;
  align-items: center;
  z-index: 1;
  align-self: center;
  elevation: 1;
  box-shadow: 0px -2.5px 2px rgba(0, 0, 0, 0.09);
`;
export const CenterButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: ${props => props.theme.colors.blue};
  shadow-color: ${props => props.theme.colors.blue};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.5;
  shadow-radius: 10px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;
