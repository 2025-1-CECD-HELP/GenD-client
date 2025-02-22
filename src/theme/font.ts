/**
 * 테마 폰트 시스템을 정의합니다.
 * 폰트 사이즈는 픽셀 단위로 정의합니다.
 * 라인 헤이트는 폰트 사이즈의 1.2/1.5배로 정의합니다.
 * 폰트 패밀리는 Pretendard Variable을 사용합니다.
 * 폰트 패밀리는 폰트 사이즈에 따라 변경됩니다.
 */
export const themeFonts = {
  title1: {
    fontFamily: 'Pretendard Variable',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 22 * 1.2,
  },
  title2: {
    fontFamily: 'Pretendard Variable',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20 * 1.2,
  },
  title3: {
    fontFamily: 'Pretendard Variable',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 18 * 1.2,
  },
  title4: {
    fontFamily: 'Pretendard Variable',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16 * 1.2,
  },
  title5: {
    fontFamily: 'Pretendard Variable',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 14 * 1.2,
  },
  text1: {
    fontFamily: 'Pretendard Variable',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 16 * 1.5,
  },
  text2: {
    fontFamily: 'Pretendard Variable',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 14 * 1.5,
  },
  text3: {
    fontFamily: 'Pretendard Variable',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.5,
  },
  text4: {
    fontFamily: 'Pretendard Variable',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 10 * 1.5,
  },
  text5: {
    fontFamily: 'Pretendard Variable',
    fontSize: 8,
    fontWeight: '400',
    lineHeight: 8 * 1.5,
  },
} as const;
