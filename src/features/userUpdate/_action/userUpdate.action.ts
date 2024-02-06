"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { userSchema } from "@/entities/user/user";
import { updateUserUseCase } from "@/entities/user/user.server";
import { z } from "zod";

const propsSchema = z.object({
  userId: z.string(),
  data: userSchema.partial(),
});

const resultSchema = z.object({
  user: userSchema,
});

export const updateUserAction = async (props: z.infer<typeof propsSchema>) => {
  const { userId, data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const user = await updateUserUseCase.exec({
    session,
    userData: data,
    userId,
  });

  return resultSchema.parseAsync({
    user,
  });
};
