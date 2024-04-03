"use server";

import { User, userSchema } from "@/entities/user/user";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { updateUserUseCase } from "../useCase/updateUser.usecase";
import { userUpdateSchema } from "../domain/schema";

const propsSchema = z.object({
  userId: z.string(),
  data: userUpdateSchema.partial(),
});

const resultSchema = z.object({
  user: userSchema,
});

export const updateUserAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<{ user: User }> => {
  const { userId, data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const user = await updateUserUseCase.exec({
    session,
    userData: data,
    userId,
  });

  return resultSchema.parseAsync({
    user,
  });
};
