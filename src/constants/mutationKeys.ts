/**
 * Tanstack Query 중 useMutation 사용시 편의성을 위해 키와 함수를 한 군데가 모아두는 파일입니다.
 * useMutation 사용시 성공 시 어떤 키를 무효화 할지 정의해야합니다.
 * 형식은 다음과 같습니다.
 * export const mutationKeys = () => {
 *   return {
 *     mutationKey: ['mutationKey'],
 *     mutationSuccessKey: [...getWorkSpacesQuery().queryKey],
 *     mutationFn: () => mutationFn(),
 *   };
 * };
 * @author 홍규진
 */
