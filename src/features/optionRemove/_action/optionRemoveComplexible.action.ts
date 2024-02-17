"use server";
import { z } from "zod";

import { OptionEntity, optionSchema } from "@/entities/option";
import { removeOptionComplexibleUseCase } from "../_useCase/optionRemoveComplexible.usecase";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";

const propsSchema = z.object({
  optionId: z.string(),
});

const resultSchema = z.object({
  option: optionSchema,
});

export const removeOptionComplexibleAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<{ option: OptionEntity }> => {
  const { optionId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const option = await removeOptionComplexibleUseCase.exec({
    optionId,
    session,
  });

  return resultSchema.parseAsync({
    option,
  });
};
