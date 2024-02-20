"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { categorySchema } from "../_domain/category.schema";
import { Category } from "../_domain/types";
import { getCategoryListUseCase } from "../_usecase/getCategoryList.usecase";

const resultSchema = z.object({
  categoryList: z.array(categorySchema),
});

type ResultT = { categoryList: Category[] };

export const getCategoryListAction = async (): Promise<ResultT> => {
  const session = await getAppSessionStrictServer();

  const categoryList = await getCategoryListUseCase.exec({ session });

  return resultSchema.parseAsync({
    categoryList: categoryList,
  });
};
