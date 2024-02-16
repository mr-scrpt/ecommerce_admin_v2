// "use server";
// import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
// import { z } from "zod";
// import { optionItemSchema } from "../../_domain/optionItem/optionItem.schema";
// import { OptionItemEntity } from "../../_domain/types";
//
// const getByIdSchema = z.object({
//   optionItemId: z.string(),
// });
//
// const resultSchema = z.object({
//   optionItem: optionItemSchema,
// });
//
// type ResultT = { optionItem: OptionItemEntity };
//
// export const getOptionItemAction = async (
//   props: z.infer<typeof getByIdSchema>,
// ): Promise<ResultT> => {
//   console.log("output_log: props =>>>", props);
//   const { optionItemId } = getByIdSchema.parse(props);
//
//   const session = await getAppSessionStrictServer();
//
//   const optionItem = await getOptionItemUseCase.exec({
//     session,
//     optionItemId,
//   });
//
//   return resultSchema.parseAsync({
//     optionItem: optionItem,
//   });
// };
//
// const getBySlugSchema = z.object({
//   optionItemSlug: z.string(),
// });
//
