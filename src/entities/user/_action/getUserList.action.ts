"use server";
import { z } from "zod";
import { UserEntity } from "../_domain/user.types";
import { userSchema } from "../_domain/user.schema";
import { getUserListUseCase } from "../_useCase/getUserList.usecase";
import { getAppSessionStrictServer } from "../../../shared/session/getAppSessionServer";

const resultSchema = z.object({
  userList: z.array(userSchema),
});

type ResultT = { userList: UserEntity[] };

export const getUserListAction = async (): Promise<ResultT> => {
  const session = await getAppSessionStrictServer();

  const userList = await getUserListUseCase.exec({
    session,
  });

  return resultSchema.parseAsync({
    userList: userList,
  });
};
