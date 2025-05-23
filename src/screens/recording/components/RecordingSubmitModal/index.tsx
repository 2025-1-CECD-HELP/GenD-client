import React, {useState} from 'react';
import {
  SubmitFormContainer,
  SubmitInput,
  SubmitRow,
  SubmitLabel,
  SubmitDropdown,
} from './index.style';

export const RecordingSubmitForm = ({
  initialTitle = '',
  initialFolder = '',
  initialDropdown = '',
  onChange,
}: {
  initialTitle?: string;
  initialFolder?: string;
  initialDropdown?: string;
  onChange?: (data: {title: string; folder: string; dropdown: string}) => void;
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [folder, setFolder] = useState(initialFolder);
  const [dropdown, setDropdown] = useState(initialDropdown);

  // 드롭다운은 실제로는 picker/modal 등으로 구현
  return (
    <SubmitFormContainer>
      <SubmitInput
        value={title}
        onChangeText={t => {
          setTitle(t);
          onChange?.({title: t, folder, dropdown});
        }}
        placeholder="회의록 제목"
      />
      <SubmitRow>
        <SubmitLabel>폴더</SubmitLabel>
        <SubmitDropdown>
          <SubmitLabel>{dropdown || '2차 회의 자료'}</SubmitLabel>
        </SubmitDropdown>
      </SubmitRow>
    </SubmitFormContainer>
  );
};
