import {TFile} from '@/services/secretary/types';

export type ChatMessage = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  fileList?: TFile[];
};
