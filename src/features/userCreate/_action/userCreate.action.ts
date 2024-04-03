"use server";

import { User, userSchema } from "@/entities/user/user";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { createUserUseCase } from "../_useCase/createUser.usecase";
import { userCreateSchema } from "../domain/schema";
import { ROLES } from "@/shared/lib/user";

const propsSchema = z.object({
  data: userCreateSchema,
});

const resultSchema = z.object({
  user: userSchema,
});

export const createUserAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<{ user: User }> => {
  const { data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const user = await createUserUseCase.exec({
    session,
    userToCreate: { ...data, role: ROLES.USER },
  });

  return resultSchema.parseAsync({
    user,
  });
};
