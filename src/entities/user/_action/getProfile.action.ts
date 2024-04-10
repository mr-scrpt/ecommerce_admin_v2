"use server";
import { z } from "zod";
import { getAppSessionStrictServer } from "../../../shared/session/getAppSessionServer";
import { profileDammySchema } from "../_domain/profile.schema";
import { ProfileDummy } from "../_domain/profile.types";
import { getProfileUseCase } from "../_useCase/instans.usecase";

const propsSchema = z.object({
  profileId: z.string(),
});

const resultSchema = z.object({
  profile: profileDammySchema,
});

type ResultT = { profile: ProfileDummy };

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
