/**
 * 게시글 작성 요청 타입
 * 홍규진
 */
export type TPostWriteRequest = {
  postTitle: string;
  postDescription: string;
  postCategory: string;
};

export type TGetPostResponse = {
  postList: Post[];
};

export type Post = {
  postId: number;
  postTitle: string;
  postDescription: string;
  postCategory: string;
  postWriter: string;
  postImageUrl: string;
  isPin: boolean;
};

export type TGetCategoryResponse = {
  categoryList: Category[];
};

export type TCreateCategoryRequest = Omit<Category, 'categoryId'>;

export type TUpdatePostPinRequest = {
  postId: number;
};

export type TDeletePostRequest = {
  postId: number;
};

export type Category = {
  categoryId: number;
  categoryName: string;
};
