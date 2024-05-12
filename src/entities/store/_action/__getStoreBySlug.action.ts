// import { z } from "zod";
// import { Store } from "../_domain/types";
// import { getStoreBySlugUseCase } from "../_usecase/instans.usecase";
// import { storeSchema } from "../_domain/store.schema";
// import { SessionContainer } from "@/shared/session/instans";
//
// const propsSchema = z.object({
//   storeSlug: z.string(),
// });
//
// const resultSchema = z.object({
//   store: storeSchema,
// });
//
// type ResultT = { store: Store };
//
// export const getStoreBySlugAction = async (
//   props: z.infer<typeof propsSchema>,
// ): Promise<ResultT> => {
//   const { storeSlug } = propsSchema.parse(props);
//
//   const session = await SessionContainer.getStrict();
//
//   const store = await getStoreBySlugUseCase.exec({
//     session,
//     storeSlug,
//   });
//
//   return resultSchema.parseAsync({
//     store: store,
//   });
// };
