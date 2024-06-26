"use server";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { categoryRelationSchema } from "../_domain/category.schema";
import { CategoryRelation } from "../_domain/types";
import { getCategoryWithRelationUseCase } from "../_usecase/instans.usecase";

const propsSchema = z.object({
  categoryId: z.string(),
});

const resultSchema = z.object({
  category: categoryRelationSchema,
});

type ResultT = { category: CategoryRelation };

export const getCategoryWithRelationAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { categoryId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const category = await getCategoryWithRelationUseCase.exec({
    session,
    categoryId,
  });

  console.log("output_log: category =>>>", category);

  return resultSchema.parseAsync({
    category: category,
  });
};
