export interface TLoginResponse {
  accessToken: string;
  refreshToken: string;
  userFlag: string | null;
}

export interface TGetUserResponse {
  memberId: number;
  memberName: string | null;
  loginProvider: string;
  memberEmail: string;
}

export interface TUpdateUserAlarmRequest {
  memberId: number;
  isPost: boolean;
  isSchedule: boolean;
}
