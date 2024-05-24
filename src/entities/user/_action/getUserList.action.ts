// "use server";
// import { z } from "zod";
// import { userSchema } from "../_domain/user.schema";
// import { UserEntity } from "../_domain/user.types";
// import { getUserListUseCase } from "../_useCase/instans.usecase";
//
// const resultSchema = z.object({
//   userList: z.array(userSchema),
// });
//
// type ResultT = { userList: UserEntity[] };
//
// export const getUserListAction = async (): Promise<ResultT> => {
//   const session = await SessionContainer.getStrict();
//
//   const userList = await getUserListUseCase.exec({
//     session,
//   });
//
//   console.log("output_log:  =>>>", userList);
//
//   return resultSchema.parseAsync({
//     userList: userList,
//   });
// };
