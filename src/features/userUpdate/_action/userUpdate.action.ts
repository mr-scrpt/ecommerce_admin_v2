"use server";

import { User } from "@/entities/user/user";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { userUpdateSchema } from "../_domain/schema";
import { updateUserUseCase } from "../_useCase/instans.usecase";
import { userSchema } from "@/entities/user/user.server";

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
