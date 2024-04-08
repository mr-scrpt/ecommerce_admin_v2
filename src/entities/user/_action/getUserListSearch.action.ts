"use server";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { userSchema } from "../_domain/user.schema";
import { User } from "../_domain/user.types";
import { getUserListSearchUseCase } from "../_useCase/instans.usecase";

const propsSchema = z.object({
  q: z.string(),
});

const resultSchema = z.object({
  userList: z.array(userSchema),
});

type ResultT = { userList: Array<User> };

export const getUserListSearchAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { q } = props;
  const session = await getAppSessionStrictServer();

  const userList = await getUserListSearchUseCase.exec({
    q,
    session,
  });

  return resultSchema.parseAsync({
    userList: userList,
  });
};
