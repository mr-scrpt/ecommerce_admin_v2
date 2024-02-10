"use server";
import { z } from "zod";
import { userSchema } from "../_domain/user.schema";
import { getUserListUseCase } from "../_useCase/getUserList.usecase";
import { getAppSessionStrictServer } from "../getAppSessionServer";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  userList: z.array(userSchema),
});

export const getUserListAction = async (props: z.infer<typeof propsSchema>) => {
  const { userId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const userList = await getUserListUseCase.exec({
    session,
    userId,
  });

  return resultSchema.parseAsync({
    userList: userList,
  });
};
