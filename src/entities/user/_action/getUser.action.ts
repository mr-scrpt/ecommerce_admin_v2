"use server";
import { z } from "zod";
import { userSchema } from "../_domain/user.schema";
import { getUserUseCase } from "../_useCase/getUser.usecase";
import { getAppSessionStrictServer } from "../getAppSessionServer";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  user: userSchema,
});

export const getUserAction = async (props: z.infer<typeof propsSchema>) => {
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
