"use server";
import { z } from "zod";
import { profileSchema } from "../_domain/profile.schema";
import { getProfileUseCase } from "../_useCase/getProfile.usecase";
import { getAppSessionStrictServer } from "../../../shared/session/getAppSessionServer";
import { Profile } from "../profile";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

type ResultT = { profile: Profile };

export const getProfileAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { userId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();
  console.log("output_log: clientData =>>>", session.clientData);

  const user = await getProfileUseCase.exec({
    session,
    userId,
  });

  return resultSchema.parseAsync({
    profile: user,
  });
};
