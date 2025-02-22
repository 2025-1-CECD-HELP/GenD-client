import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * accessToken / refreshToken 을 가져옵니다.
 * @returns accessToken / refreshToken
 * @author 홍규진
 */
export const getAccessToken = async () => {
  const token = await EncryptedStorage.getItem('accessToken');
  return token;
};
export const getRefreshToken = async () => {
  const token = await EncryptedStorage.getItem('refreshToken');
  return token;
};

/**
 * accessToken / refreshToken 을 설정합니다.
 * @param token 토큰
 * @author 홍규진
 */
export const setAccessToken = async (token: string) => {
  await EncryptedStorage.setItem('accessToken', token);
};

export const setRefreshToken = async (token: string) => {
  await EncryptedStorage.setItem('refreshToken', token);
};
