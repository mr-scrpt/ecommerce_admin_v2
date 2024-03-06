import { categoryRepository } from "../_repository/category.repo";

export const getCategoryListApi = async () => {
  console.log("output_log: in getCategoryListApi  =>>>");
  const result = categoryRepository.getCategoryList();
  return result;
  //
  // console.log("output_log: in action =>>>", result);
};

// export const getCategoryListUseCase = new GetCategoryListUseCase(
//   categoryRepository,
// );
