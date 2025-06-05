import {useWindowDimensions} from 'react-native';

export const useTabletUI = () => {
  const {width} = useWindowDimensions();
  return width >= 768;
};
