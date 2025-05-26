export type Menu = {
  label: string;
  isDelete?: boolean;
  isDownload?: boolean;
  onPress: () => void;
};
