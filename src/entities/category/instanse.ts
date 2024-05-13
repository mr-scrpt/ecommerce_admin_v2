"use server";
import { initModule } from "@/app/module";
import { GetCategoryService } from "./_service/getCategory.service";
import { GetCategoryListService } from "./_service/getCategoryList.service";

export const categoryListService = async () =>
  initModule.get(GetCategoryListService).execute();

type CategoryPayload = {
  categoryId?: string;
  categorySlug?: string;
};

export const categoryService = async (payload: CategoryPayload) =>
  initModule.get(GetCategoryService).execute(payload);

// export const categoryService = async () => ({
//   getCategoryList: async () => await categoryListService(),
//   getCategoryBySlug: async (slug: string) => await categoryListBySlug(slug),
// });
// export const getCategoryList = async () => {
//   // const allControllers = initModule.getAll(Service).map((c) => c.execute);
//   // console.log("output_log: all =>>>", allControllers);
//   //
//   // allControllers.map((c) => console.log(c));
//   const categoryListService = initModule.get(Service);
//   return await categoryListService.execute();
// };
