// "use server";
//
// import { initModule } from "@/app/module";
// import { SessionService } from "@/shared/session/session.service";
// import { z } from "zod";
// import { categorySchema } from "../_domain/category.schema";
// import { Category } from "../_domain/types";
// import { getCategoryListUseCase } from "../_usecase/instans.usecase";
//
// const resultSchema = z.object({
//   categoryList: z.array(categorySchema),
// });
//
// type ResultT = { categoryList: Category[] };
//
// export const getCategoryListAction = async (): Promise<ResultT> => {
//   // const session = await SessionContainer.getStrict();
//   const session = await initModule.get(SessionService).getStrict();
//
//   const categoryList = await getCategoryListUseCase.exec({ session });
//
//   return resultSchema.parseAsync({
//     categoryList,
//   });
// };
