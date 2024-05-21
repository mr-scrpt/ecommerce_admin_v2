// "use server";
//
// import { Category } from "@/entities/category";
// import { slugGenerator } from "@/shared/lib/slugGenerator";
// import { z } from "zod";
// import { createCategoryComplexibleUseCase } from "../_usecase/instans.usecase";
// import { categoryCreateSchema } from "../_domain/schema";
// import { categorySchema } from "@/entities/category/server";
// import { SessionContainer } from "@/shared/session/instans";
//
// const propsSchema = z.object({
//   data: categoryCreateSchema,
// });
//
// const resultSchema = z.object({
//   category: categorySchema,
// });
//
// type ResultT = { category: Category };
//
// export const categoryCreateAction = async (
//   props: z.infer<typeof propsSchema>,
// ): Promise<ResultT> => {
//   const { data } = propsSchema.parse(props);
//   const { propertyList, ...categoryData } = data;
//
//   const session = await SessionContainer.getStrict();
//
//   const slug = slugGenerator(data.name);
//
//   const category = await createCategoryComplexibleUseCase.exec({
//     session,
//     dataToCreate: {
//       categoryData: {
//         ...categoryData,
//         slug,
//       },
//
//       propertyListData: propertyList,
//     },
//   });
//
//   return resultSchema.parseAsync({
//     category,
//   });
// };
