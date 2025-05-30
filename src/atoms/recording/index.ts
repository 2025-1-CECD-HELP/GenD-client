import {atom} from 'jotai';

export interface RecordingState {
  templateId: string;
  templateContent: Array<{
    objectKey: string;
    objectValue: string;
  }>;
  title: string;
  folder: string;
  audioFile?: {
    uri: string;
    name: string;
    type: string;
  };
}

export const recordingState = atom<RecordingState>({
  templateId: '1',
  templateContent: [],
  title: '',
  folder: '',
});
