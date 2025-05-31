import {atom} from 'jotai';

export interface Alert {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  isRead: boolean;
}

export const alertState = atom<Alert[]>([]);
