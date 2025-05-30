import {atom} from 'jotai';

export interface RecordingState {
  templateId: number;
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

const defaultState: RecordingState = {
  templateId: -1,
  templateContent: [],
  title: '',
  folder: '',
};

export const recordingState = atom<RecordingState>(defaultState);
