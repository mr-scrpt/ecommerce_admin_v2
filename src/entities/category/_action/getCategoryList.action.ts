"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { categorySchema } from "../_domain/category.schema";
import { CategoryEntity } from "../_domain/types";
import { getCategoryListUseCase } from "../_usecase/getCategoryList.usecase";

const propsSchema = z.object({
  categoryId: z.string(),
});

const resultSchema = z.object({
  categoryList: z.array(categorySchema),
});

type ResultT = { categoryList: CategoryEntity[] };

export const getCategoryListAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { categoryId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const categoryList = await getCategoryListUseCase.exec({
    session,
    categoryId,
  });

  return resultSchema.parseAsync({
    categoryList: categoryList,
  });
};
