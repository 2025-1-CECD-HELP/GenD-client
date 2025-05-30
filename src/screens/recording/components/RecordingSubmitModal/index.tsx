import React, {useEffect} from 'react';
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
import {getTodayMeetingTitle} from '../../utils/formatTime';

export const RecordingSubmitForm = () => {
  const [recording, setRecording] = useAtom(recordingState);
  const {directoryList} = useRecord();

  useEffect(() => {
    if (!recording.title) {
      setRecording(prev => ({...prev, title: getTodayMeetingTitle()}));
    }
  }, [recording.title, setRecording]);

  return (
    <SubmitFormContainer>
      <SubmitInput
        value={recording.title}
        onChangeText={title => {
          setRecording(prev => ({...prev, title}));
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
                setRecording(prev => ({
                  ...prev,
                  folder: dir.dirId.toString(),
                }));
              }}
              selected={recording.folder === dir.dirId.toString()}>
              {dir.dirName}
            </SubmitLabel>
          ))}
        </SubmitDropdown>
      </SubmitRow>
    </SubmitFormContainer>
  );
};
