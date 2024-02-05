"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { removeUserComplexibleUseCase } from "../_useCase/removeUserComplexible.usecase";

const propsSchema = z.object({
  userId: z.string(),
});

export const removeUserComplexibleAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<void> => {
  const { userId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  await removeUserComplexibleUseCase.exec({
    userId,
    session,
  });
};
