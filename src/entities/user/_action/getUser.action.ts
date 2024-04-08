"use server";
import { z } from "zod";
import { getAppSessionStrictServer } from "../../../shared/session/getAppSessionServer";
import { userSchema } from "../_domain/user.schema";
import { UserEntity } from "../_domain/user.types";
import { getUserUseCase } from "../_useCase/instans.usecase";

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
