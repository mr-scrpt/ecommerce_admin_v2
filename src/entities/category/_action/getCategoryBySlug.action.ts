import { z } from "zod";
import { categorySchema } from "..";
import { Category } from "../_domain/types";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { getCategoryBySlugUseCase } from "../_usecase/getCategoryBySlug.usecase";

const propsSchema = z.object({
  categorySlug: z.string(),
});

const resultSchema = z.object({
  category: categorySchema,
});

type ResultT = { category: Category };

export const getCategoryBySlugAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { categorySlug } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const category = await getCategoryBySlugUseCase.exec({
    session,
    categorySlug,
  });

  return resultSchema.parseAsync({
    category: category,
  });
};
