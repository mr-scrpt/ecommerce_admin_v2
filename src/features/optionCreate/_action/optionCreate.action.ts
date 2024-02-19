"use server";

import { optionCreateSchema, optionSchema } from "@/entities/option";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { createOptionComplexibleUseCase } from "../_useCase/optionCreateComplexible.usecase";

const propsSchema = z.object({
  data: optionCreateSchema,
});

const resultSchema = z.object({
  option: optionSchema,
});

export const optionCreateAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const option = await createOptionComplexibleUseCase.exec({
    session,
    optionData: data,
  });
  console.log("output_log: created option with option item =>>>", option);

  return resultSchema.parseAsync({
    option,
  });
};
