import {ScheduleType} from '../types';
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
export const TYPE_COLORS: Record<string, string> = {
  회의: 'red',
  발표: 'purple',
  활동: 'yellow',
  공부: 'pink',
};
export const TYPES: ScheduleType[] = [
  'Meeting',
  'Presentation',
  'Activity',
  'Study',
];

// 더미 일정 데이터
export const DUMMY_SCHEDULES = [
  {
    scheduleId: '1',
    type: '회의',
    scheduleTitle: '팀 회의',
    startSchedule: new Date('2024-12-08T10:00:00'),
    endSchedule: new Date('2024-12-08T11:00:00'),
    isAlarm: true,
    scheduleDescription: '주간 업무 공유',
  },
  {
    scheduleId: '2',
    type: '공부',
    scheduleTitle: 'React 공부',
    startSchedule: new Date('2024-12-08T14:00:00'),
    endSchedule: new Date('2024-12-08T16:00:00'),
    isAlarm: false,
    scheduleDescription: '',
  },
  {
    scheduleId: '3',
    type: '발표',
    scheduleTitle: '프로젝트 발표',
    startSchedule: new Date('2024-12-12T09:00:00'),
    endSchedule: new Date('2024-12-12T10:00:00'),
    isAlarm: true,
    scheduleDescription: '',
  },
  {
    scheduleId: '4',
    type: '활동',
    scheduleTitle: '동아리 활동',
    startSchedule: new Date('2024-12-19T18:00:00'),
    endSchedule: new Date('2024-12-19T20:00:00'),
    isAlarm: false,
    scheduleDescription: '',
  },
];

export const ALARM_OPTIONS = [
  {label: ' 5분 전', value: 5},
  {label: '10분 전', value: 10},
  {label: '15분 전', value: 15},
  {label: '30분 전', value: 30},
  {label: '1시간 전', value: 60},
];
