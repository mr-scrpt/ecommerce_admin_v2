"use server";
import { z } from "zod";
import { UserEntity } from "../_domain/user.types";
import { userSchema } from "../_domain/user.schema";
import { getUserUseCase } from "../_useCase/getUser.usecase";
import { getAppSessionStrictServer } from "../../../shared/session/getAppSessionServer";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  user: userSchema,
});

type ResultT = { user: UserEntity };

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
