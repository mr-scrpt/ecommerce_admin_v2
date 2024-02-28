// "use server";
// import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
// import { z } from "zod";
// import { propertyItemSchema } from "../../_domain/property/property.schema";
// import { PropertyItemEntity } from "../../_domain/types";
// import { getPropertyItemListUseCase } from "../../_usecase/property/getPropertyList.usecase";
//
// // const propsSchema = z.object({
// //   propertyItemId: z.string(),
// // });
//
// const resultSchema = z.object({
//   propertyItemList: z.array(propertyItemSchema),
// });
//
// type ResultT = { propertyItemList: PropertyItemEntity[] };
//
// export const getPropertyItemListAction = async (): Promise<ResultT> => {
//   // const { propertyItemId } = propsSchema.parse(props);
//
//   const session = await getAppSessionStrictServer();
//
//   const propertyItemList = await getPropertyItemListUseCase.exec({ session });
//
//   return resultSchema.parseAsync({
//     propertyItemList: propertyItemList,
//   });
// };
