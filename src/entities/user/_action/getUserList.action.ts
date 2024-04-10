"use server";
import { z } from "zod";
import { getAppSessionStrictServer } from "../../../shared/session/getAppSessionServer";
import { userSchema } from "../_domain/user.schema";
import { UserEntity } from "../_domain/user.types";
import { getUserListUseCase } from "../_useCase/instans.usecase";

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
