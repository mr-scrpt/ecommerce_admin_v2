// "use server";
// import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
// import { z } from "zod";
// import { optionItemSchema } from "../../_domain/option/option.schema";
// import { OptionItemEntity } from "../../_domain/types";
// import { getOptionItemListUseCase } from "../../_usecase/option/getOptionList.usecase";
//
// // const propsSchema = z.object({
// //   optionItemId: z.string(),
// // });
//
// const resultSchema = z.object({
//   optionItemList: z.array(optionItemSchema),
// });
//
// type ResultT = { optionItemList: OptionItemEntity[] };
//
// export const getOptionItemListAction = async (): Promise<ResultT> => {
//   // const { optionItemId } = propsSchema.parse(props);
//
//   const session = await getAppSessionStrictServer();
//
//   const optionItemList = await getOptionItemListUseCase.exec({ session });
//
//   return resultSchema.parseAsync({
//     optionItemList: optionItemList,
//   });
// };
