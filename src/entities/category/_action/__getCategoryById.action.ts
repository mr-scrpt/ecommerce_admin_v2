"use server";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { categorySchema } from "..";
import { Category } from "../_domain/types";
import { getCategoryByIdUseCase } from "../_usecase/__getCategoryById.usecase";

const propsSchema = z.object({
  categoryId: z.string(),
});
const resultSchema = z.object({
  category: categorySchema,
});

type ResultT = { category: Category };

export const getCategoryByIdAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { categoryId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const category = await getCategoryByIdUseCase.exec({
    session,
    categoryId,
  });

  return resultSchema.parseAsync({
    category: category,
  });
};
