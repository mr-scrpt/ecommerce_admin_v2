// "use server";
// import { z } from "zod";
// import { productSchema } from "../_domain/product.schema";
// import { ProductEntity } from "../_domain/types";
// import { getProductUseCase } from "../_usecase/instans.usecase";
// import { SessionContainer } from "@/shared/session/instans";
//
// const getByIdSchema = z.object({
//   productId: z.string(),
// });
//
// const resultSchema = z.object({
//   product: productSchema,
// });
//
// type ResultT = { product: ProductEntity };
//
// export const getProductAction = async (
//   props: z.infer<typeof getByIdSchema>,
// ): Promise<ResultT> => {
//   const { productId } = getByIdSchema.parse(props);
//
//   const session = await SessionContainer.getStrict();
//
//   const product = await getProductUseCase.exec({
//     session,
//     productId,
//   });
//
//   return resultSchema.parseAsync({
//     product: product,
//   });
// };
