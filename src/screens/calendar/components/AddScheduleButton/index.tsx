import {AddButton, AddButtonText} from './index.style';

export const AddScheduleButton = ({
  handleOpenAddSchedule,
}: {
  handleOpenAddSchedule: () => void;
}) => {
  return (
    <AddButton onPress={handleOpenAddSchedule}>
      <AddButtonText>+</AddButtonText>
    </AddButton>
  );
};
