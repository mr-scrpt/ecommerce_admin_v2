"use server";

import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { profileSchema } from "@/entities/user/profile";
import { updateProfileUseCase } from "@/entities/user/profile.server";
import { z } from "zod";

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
  console.log("output_log: profile data =>>>", data);

  const session = await getAppSessionStrictServer();

  const user = await updateProfileUseCase.exec({
    session,
    profileData: data,
    userId,
  });

  return resultSchema.parseAsync({
    profile: user,
  });
};
