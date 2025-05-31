import React, {useState, useEffect} from 'react';
import {
  SubmitFormContainer,
  SubmitInput,
  SubmitRow,
  SubmitLabel,
  SubmitDropdown,
} from './index.style';
import {useRecord} from '../../hooks/useRecord';
import {useAtom} from 'jotai';
import {recordingState} from '@/atoms/recording';

interface RecordingSubmitFormProps {
  initialData: {
    templateId: number;
    templateContent: Array<{objectKey: string; objectValue: string}>;
    title: string;
    folder: string;
  };
}

export const RecordingSubmitForm = ({
  initialData,
}: RecordingSubmitFormProps) => {
  const [_, setRecording] = useAtom(recordingState);
  const {directoryList} = useRecord();
  const [formData, setFormData] = useState({
    title: initialData.title,
    folder: initialData.folder,
  });

  // initialData가 변경될 때 formData 업데이트
  useEffect(() => {
    setFormData({
      title: initialData.title,
      folder: initialData.folder,
    });
  }, [initialData]);

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({...prev, title}));
    setRecording(prev => ({
      ...prev,
      title,
    }));
  };

  const handleFolderSelect = (dirId: string) => {
    setFormData(prev => ({...prev, folder: dirId}));
    setRecording(prev => ({
      ...prev,
      folder: dirId,
    }));
  };

  return (
    <SubmitFormContainer>
      <SubmitInput
        value={formData.title}
        onChangeText={handleTitleChange}
        placeholder="회의록 제목"
      />
      <SubmitRow>
        <SubmitLabel>폴더</SubmitLabel>
        <SubmitDropdown>
          {directoryList?.directoryList.map(dir => (
            <SubmitLabel
              key={dir.dirId}
              onPress={() => handleFolderSelect(dir.dirId.toString())}
              selected={formData.folder === dir.dirId.toString()}>
              {dir.dirName}
            </SubmitLabel>
          ))}
        </SubmitDropdown>
      </SubmitRow>
    </SubmitFormContainer>
  );
};
