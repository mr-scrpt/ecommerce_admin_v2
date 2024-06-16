// "use server";
// import { z } from "zod";
//
// import { ProductEntity } from "@/entities/product";
// import { slugGenerator } from "@/shared/lib/slugGenerator";
// import { productSchema } from "@/entities/product/server";
// import { updateProductComplexibleUseCase } from "../_usecase/instans.usecase";
// import { productUpdateSchema } from "../_domain/schema";
// import { SessionContainer } from "@/shared/session/instans";
//
// const propsSchema = z.object({
//   productId: z.string(),
//   data: productUpdateSchema,
// });
//
// const resultSchema = z.object({
//   product: productSchema,
// });
//
// export const updateProductAction = async (
//   props: z.infer<typeof propsSchema>,
// ): Promise<{ product: ProductEntity }> => {
//   const { productId, data } = propsSchema.parse(props);
//   const { categoryList, propertyItemListSelected, ...productData } = data;
//
//   const session = await SessionContainer.getStrict();
//
//   const slug = slugGenerator(data.name);
//
//   const product = await updateProductComplexibleUseCase.exec({
//     session,
//     dataToUpdate: {
//       productId,
//       productData: { ...productData, slug },
//       propertyItemListSelected,
//       categoryListId: categoryList,
//     },
//   });
//
//   return resultSchema.parseAsync({
//     product,
//   });
// };
