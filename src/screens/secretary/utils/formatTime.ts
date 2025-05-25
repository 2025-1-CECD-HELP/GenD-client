/**
 * 현재 시간을 포맷팅하는 함수입니다.
 * 시간을 시:분 형식으로 반환합니다.
 * @author 홍규진
 */
export const formatTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
