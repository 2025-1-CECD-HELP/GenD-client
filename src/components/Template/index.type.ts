import { ImageSourcePropType } from 'react-native';
import {SvgProps} from 'react-native-svg';

export type TemplateType = {
  title: string;
  description: string;
  Icon: React.FC<SvgProps>;
  previewImage: ImageSourcePropType;
};
