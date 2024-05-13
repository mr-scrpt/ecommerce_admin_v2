// import { SessionContainer } from "@/shared/session/instans";
// import { z } from "zod";
// import { categorySchema } from "../_domain/category.schema";
// import { Category } from "../_domain/types";
// import { getCategoryBySlugUseCase } from "../_usecase/instans.usecase";
//
// const propsSchema = z.object({
//   categorySlug: z.string(),
// });
//
// const resultSchema = z.object({
//   category: categorySchema,
// });
//
// type ResultT = { category: Category };
//
// export const getCategoryBySlugAction = async (
//   props: z.infer<typeof propsSchema>,
// ): Promise<ResultT> => {
//   const { categorySlug } = propsSchema.parse(props);
//
//   const session = await SessionContainer.getStrict();
//
//   const category = await getCategoryBySlugUseCase.exec({
//     session,
//     categorySlug,
//   });
//
//   return resultSchema.parseAsync({
//     category: category,
//   });
// };
