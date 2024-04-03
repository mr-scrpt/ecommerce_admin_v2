"use server";

import { User, userUpdateSchema } from "@/entities/user/user";
import { updateUserUseCase } from "@/entities/user/user.server";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";

const propsSchema = z.object({
  userId: z.string(),
  data: userUpdateSchema.partial(),
});

const resultSchema = z.object({
  user: userUpdateSchema,
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
