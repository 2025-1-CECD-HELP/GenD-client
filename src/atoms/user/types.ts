export const STORAGE_KEY = '@workspace_state';
export const DEFAULT_WORKSPACE_ID = '-1';

export interface UserState {
  memberId: number;
  memberName: string;
  loginProvider: string;
  memberEmail: string;
}
