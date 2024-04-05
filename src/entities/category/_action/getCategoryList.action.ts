"use server";
import "reflect-metadata";

import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { categorySchema } from "../_domain/category.schema";
import { Category } from "../_domain/types";
import { GetCategoryListUseCase } from "../_usecase/getCategoryList.usecase";
import categoryContainer from "../module";

const resultSchema = z.object({
  categoryList: z.array(categorySchema),
});

type ResultT = { categoryList: Category[] };

const c = categoryContainer.get(GetCategoryListUseCase);

export const getCategoryListAction = async (): Promise<ResultT> => {
  const session = await getAppSessionStrictServer();

  const categoryList = await c.exec({ session });

  return resultSchema.parseAsync({
    categoryList,
  });
};
