"use server";

import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { profileSchema } from "@/entities/user/profile";
import { z } from "zod";
import { updateProfileUseCase } from "../_useCase/updateProfile.usecase";

const propsSchema = z.object({
  userId: z.string(),
  data: profileSchema.partial(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const updateProfileAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { userId, data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const profile = await updateProfileUseCase.exec({
    session,
    profileData: data,
    userId,
  });

  return resultSchema.parseAsync({
    profile,
  });
};
