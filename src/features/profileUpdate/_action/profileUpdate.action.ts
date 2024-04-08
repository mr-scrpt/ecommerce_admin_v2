"use server";

import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { profileSchema } from "@/entities/user/profile";
import { z } from "zod";
import { updateProfileUseCase } from "../_useCase/instans.usecase";

const propsSchema = z.object({
  profileId: z.string(),
  data: profileSchema.partial(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const updateProfileAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { profileId, data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const profile = await updateProfileUseCase.exec({
    session,
    profileData: data,
    profileId,
  });

  return resultSchema.parseAsync({
    profile,
  });
};
