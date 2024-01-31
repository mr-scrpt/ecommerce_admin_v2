"use server";
import { z } from "zod";
import { profileSchema } from "../_domain/schema";
import { getAppSessionStrictServer } from "../getAppSessionServer";
import { getUserUseCase } from "../_useCase/getUser";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const getUserProfileAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { userId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const user = await getUserUseCase.exec({
    session,
    userId,
  });

  return resultSchema.parseAsync({
    profile: user,
  });
};
