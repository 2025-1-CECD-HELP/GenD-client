export interface JwtTokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface TGetLoginResponse {
  jwtTokenDto: JwtTokenDto;
  userFlag: string | null;
}
