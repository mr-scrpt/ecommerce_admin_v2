"use server";

import { User } from "@/entities/user/user";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { userCreateSchema } from "../_domain/schema";
import { ROLES } from "@/shared/lib/user";
import { createUserUseCase } from "../_useCase/instans.usecase";
import { userSchema } from "@/entities/user/user.server";

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
