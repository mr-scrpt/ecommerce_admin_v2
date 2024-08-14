import { notice, noticeError } from "@/shared/ui/notice/notice";
import { useCategoryCreateMutation } from "../_mutation/useCategoryCreate.mutation";

export const useCategoryCreateModel = () => {
  const { categoryCreate, isSuccess, isPending, isError, error } =
    useCategoryCreateMutation();

  if (isSuccess) {
    notice({ title: "Success", description: "Category has been created" });
  }

  if (isError && error) {
    noticeError({ title: "Error", description: error.message });
  }

  return {
    categoryCreate,
    isPending,
    isSuccess,
  };
};

// const buildError = (error: string) => {
//   const arr = [...(JSON.parse(error) as Array<string>)];
//
//   return arr.join(",");
// };
