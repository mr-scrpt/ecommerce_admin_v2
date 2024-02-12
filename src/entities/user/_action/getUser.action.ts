"use server";
import { z } from "zod";
import { userSchema } from "../_domain/user.schema";
import { getUserUseCase } from "../_useCase/getUser.usecase";
import { getAppSessionStrictServer } from "../getAppSessionServer";
import { User } from "../user";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  user: userSchema,
});

type ResultT = { user: User };

export const getUserAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { userId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const user = await getUserUseCase.exec({
    session,
    userId,
  });

  return resultSchema.parseAsync({
    user: user,
  });
};
