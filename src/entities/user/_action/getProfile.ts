"use server";
import { z } from "zod";
import { profileSchema } from "../_domain/schema";
import { GetProfileUseCase, getProfileUseCase } from "../_useCase/getProfile";
import { getAppSessionStrictServer } from "../getAppSessionServer";

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

  const user = await getProfileUseCase.exec({
    session,
    userId,
  });

  return resultSchema.parseAsync({
    profile: user,
  });
};
