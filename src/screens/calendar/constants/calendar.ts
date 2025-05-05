import {ScheduleCategory} from '../types';
// 한글 요일/월 설정
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

// 카테고리별 색상
export const CATEGORY_COLORS: Record<string, string> = {
  회의: 'red',
  발표: 'purple',
  활동: 'yellow',
  공부: 'pink',
};

// 더미 일정 데이터
export const DUMMY_SCHEDULES = [
  {
    id: '1',
    category: '회의',
    title: '팀 회의',
    startDate: new Date('2024-12-08T10:00:00'),
    endDate: new Date('2024-12-08T11:00:00'),
    isAlarm: true,
    memo: '주간 업무 공유',
  },
  {
    id: '2',
    category: '공부',
    title: 'React 공부',
    startDate: new Date('2024-12-08T14:00:00'),
    endDate: new Date('2024-12-08T16:00:00'),
    isAlarm: false,
    memo: '',
  },
  {
    id: '3',
    category: '발표',
    title: '프로젝트 발표',
    startDate: new Date('2024-12-12T09:00:00'),
    endDate: new Date('2024-12-12T10:00:00'),
    isAlarm: true,
    memo: '',
  },
  {
    id: '4',
    category: '활동',
    title: '동아리 활동',
    startDate: new Date('2024-12-19T18:00:00'),
    endDate: new Date('2024-12-19T20:00:00'),
    isAlarm: false,
    memo: '',
  },
];

export const CATEGORIES: ScheduleCategory[] = ['회의', '발표', '활동', '공부'];

export const ALARM_OPTIONS = [
  {label: ' 5분 전', value: 5},
  {label: '10분 전', value: 10},
  {label: '15분 전', value: 15},
  {label: '30분 전', value: 30},
  {label: '1시간 전', value: 60},
];
