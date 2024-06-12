// "use server";
// import { z } from "zod";
// import { productSchema } from "../_domain/product.schema";
// import { ProductEntity } from "../_domain/types";
// import { getProductListUseCase } from "../_usecase/instans.usecase";
// import { SessionContainer } from "@/shared/session/instans";
//
// const resultSchema = z.object({
//   productList: z.array(productSchema),
// });
//
// type ResultT = { productList: ProductEntity[] };
//
// export const getProductListAction = async (): Promise<ResultT> => {
//   const session = await SessionContainer.getStrict();
//
//   const productList = await getProductListUseCase.exec({
//     session,
//   });
//
//   return resultSchema.parseAsync({
//     productList: productList,
//   });
// };
