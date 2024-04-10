"use server";

import { userDammySchema } from "@/entities/user/_domain/user.schema";
import { UserDummyEntity } from "@/entities/user/_domain/user.types";
import { ROLES } from "@/shared/lib/user";
import { z } from "zod";
import { createUserRegistrationUseCase } from "../_useCase/instans.usecase";

const propsSchema = z.object({
  data: userRegistrationSchema,
});

const resultSchema = z.object({
  user: userDammySchema,
});

export const registrationUserAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<{ user: UserDummyEntity }> => {
  const { data } = propsSchema.parse(props);

  const user = await createUserRegistrationUseCase.exec({
    ...data,
    role: ROLES.USER,
  });

  return resultSchema.parseAsync({
    user,
  });
};
