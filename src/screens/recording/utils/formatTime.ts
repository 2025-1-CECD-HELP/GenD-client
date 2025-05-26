/**
 * 타이머 포맷
 * ms 를 넣으면 분, 초, 밀리초의 형태로 변환해줍니다.
 * @author 홍규진
 * @param ms 밀리초
 * @returns 분, 초, 밀리초
 */
export const formatTime = (ms: number) => {
  const totalMs = Math.floor(ms * 10); // 10ms 단위를 실제 ms로 변환
  const m = String(Math.floor(totalMs / 60000)).padStart(2, '0'); // 분
  const s = String(Math.floor((totalMs % 60000) / 1000)).padStart(2, '0'); // 초
  const msStr = String(Math.floor((totalMs % 1000) / 10)).padStart(2, '0'); // 밀리초 (2자리)
  return {m, s, msStr};
};

/**
 * 오늘 회의록 제목을 반환해줍니다.
 * yyyy.mm.dd 회의록
 * @author 홍규진
 * @returns 일자를 통해 회의록 제목을 반환합니다.
 */
export function getTodayMeetingTitle() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} 회의록`;
}
