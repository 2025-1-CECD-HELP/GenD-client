import React, {useState} from 'react';
import {
  SubmitFormContainer,
  SubmitInput,
  SubmitRow,
  SubmitLabel,
  SubmitDropdown,
} from './index.style';
import {useRecord} from '../../hooks/useRecord';

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
  const [dropdown, _setDropdown] = useState(initialDropdown);
  const {directoryList} = useRecord();

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
          {directoryList?.directoryList.map(dir => (
            <SubmitLabel
              key={dir.dirId}
              onPress={() => {
                setFolder(dir.dirName);
                onChange?.({title, folder: dir.dirId.toString(), dropdown});
              }}
              selected={folder === dir.dirId.toString()}>
              {dir.dirName}
            </SubmitLabel>
          ))}
        </SubmitDropdown>
      </SubmitRow>
    </SubmitFormContainer>
  );
};
