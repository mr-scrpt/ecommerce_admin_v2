"use server";
import { z } from "zod";
import { profileSchema } from "../_domain/profile.schema";
import { getAppSessionStrictServer } from "../../../shared/network/getAppSessionServer";
import { Profile } from "../profile";
import { getProfileUseCase } from "../_useCase/instans.usecase";

const propsSchema = z.object({
  profileId: z.string(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

type ResultT = { profile: Profile };

export const getProfileAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { profileId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const profile = await getProfileUseCase.exec({
    session,
    profileId,
  });

  return resultSchema.parseAsync({
    profile,
  });
};
