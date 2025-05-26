export const formatDateTime = (date: Date) => {
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// '2025-03-03' → '2025-03'
export function getMonth(dateStr: string | Date) {
  const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

// 주의 시작/끝 구하기
export function getWeekRange(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDay();
  const start = new Date(d);
  start.setDate(d.getDate() - day);
  const end = new Date(d);
  end.setDate(d.getDate() + (6 - day));
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
}

// 같은 주인지 판별
export function isSameWeek(date: Date, start: string, end: string) {
  const d = date.toISOString().split('T')[0];
  return d >= start && d <= end;
}

// 같은 달인지 판별
export function isSameMonth(date: Date, month: string) {
  return getMonth(date) === month;
}

// 모드에 따른 아이콘 반환
export const getModeIcon = (mode: string) => {
  switch (mode) {
    case 'month':
      return '📅'; // 또는 <MonthIcon />
    case 'week':
      return '🗂️'; // 또는 <WeekIcon />
    case 'day':
      return '📝'; // 또는 <DayIcon />
    default:
      return '';
  }
};
