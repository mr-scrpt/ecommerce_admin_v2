"use server";

import { GetCategoryListService } from "@/entities/category/server";
import { initModule } from "./module";

export const getCategoryList = async () => {
  const categoryListService = initModule.get(GetCategoryListService);
  return await categoryListService.execute();
};
