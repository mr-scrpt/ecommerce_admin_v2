// "use server";
// import { z } from "zod";
// import { settleToSelectSchema } from "../_domain/settlement.schema";
// import { SettleToSelect } from "../_domain/settlement.type";
// import { getSettlementListSearchToSelectUseCase } from "../_usecase/instans.usecasets";
// import { SessionContainer } from "@/shared/session/instans";
//
// const propsSchema = z.object({
//   q: z.string(),
// });
//
// const resultSchema = z.object({
//   settlementListToSelect: settleToSelectSchema.array(),
// });
//
// type ResultT = { settlementListToSelect: Array<SettleToSelect> };
//
// export const getSettlementListSearchToSelectAction = async (
//   props: z.infer<typeof propsSchema>,
// ): Promise<ResultT> => {
//   const { q } = propsSchema.parse(props);
//   const session = await SessionContainer.getStrict();
//
//   const settlementListToSelect =
//     await getSettlementListSearchToSelectUseCase.exec({
//       q,
//       session,
//     });
//
//   return resultSchema.parseAsync({
//     settlementListToSelect,
//   });
// };
