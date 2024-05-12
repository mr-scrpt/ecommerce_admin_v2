"use server";
import { UserEntity, userSchema } from "@/entities/user/user";
import { z } from "zod";
import { removeUserComplexibleUseCase } from "../_useCase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  user: userSchema,
});

export const removeUserComplexibleAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<{ user: UserEntity }> => {
  const { userId } = propsSchema.parse(props);

  const session = await SessionContainer.getStrict();

  const user = await removeUserComplexibleUseCase.exec({
    userId,
    session,
  });

  return resultSchema.parseAsync({
    user,
  });
};
