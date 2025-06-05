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

export interface TEmailSignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface TEmailSigninRequest {
  email: string;
  password: string;
  fcmToken: string;
}

export interface TEmailSigninResponse {
  accessToken: string;
  refreshToken: string;
}
