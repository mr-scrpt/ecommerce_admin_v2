"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { removeUserComplexibleUseCase } from "../_useCase/removeUserComplexible.usecase";

const propsSchema = z.object({
  userId: z.string(),
});

export const removeUserAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<void> => {
  console.log("output_log: remove action =>>>", props);
  const { userId } = propsSchema.parse(props);
  console.log("output_log: userId =>>>", userId);

  const session = await getAppSessionStrictServer();

  console.log("output_log:  =>>>", session);

  await removeUserComplexibleUseCase.exec({
    userId,
    session,
  });
};
