import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createCategory} from '@/services/post';
import {TCreateCategoryRequest} from '@/services/post/types';

/**
 * 카테고리 생성 뮤테이션 훅입니다.
 * 카테고리 생성 요청을 처리합니다.
 * 카테고리 생성시에 카테고리 목록 조회 캐시를 무효화합니다.
 * @returns 카테고리 생성 뮤테이션 함수
 * @author 홍규진
 */
export const useCategoryMutation = () => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationKey: ['category'],
    mutationFn: (category: TCreateCategoryRequest) =>
      //TODO-[규진] 워크스페이스 아이디 받아오기
      createCategory('1', category),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['category']});
    },
  });

  return {
    mutate,
  };
};
