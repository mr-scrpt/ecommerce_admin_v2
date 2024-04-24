// "use server";
// import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
// import { z } from "zod";
// import { storeRelationSchema } from "../_domain/store.schema";
// import { StoreRelation } from "../_domain/types";
// import { getStoreWithRelationUseCase } from "../_usecase/instans.usecase";
//
// const propsSchema = z.object({
//   storeId: z.string(),
// });
//
// const resultSchema = z.object({
//   store: storeRelationSchema,
// });
//
// type ResultT = { store: StoreRelation };
//
// export const getStoreWithRelationAction = async (
//   props: z.infer<typeof propsSchema>,
// ): Promise<ResultT> => {
//   const { storeId } = propsSchema.parse(props);
//
//   const session = await getAppSessionStrictServer();
//
//   const store = await getStoreWithRelationUseCase.exec({
//     session,
//     storeId,
//   });
//
//   console.log("output_log: store =>>>", store);
//
//   return resultSchema.parseAsync({
//     store: store,
//   });
// };
