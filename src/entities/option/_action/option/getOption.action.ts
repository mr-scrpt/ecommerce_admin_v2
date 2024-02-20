"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { optionSchema } from "../../_domain/option/option.schema";
import { Option } from "../../_domain/option/types";
import { getOptionUseCase } from "../../_usecase/option/getOption.usecase";

const propsSchema = z.object({
  optionId: z.string(),
});

const resultSchema = z.object({
  option: optionSchema,
});

type ResultT = { option: Option };

export const getOptionAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { optionId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const option = await getOptionUseCase.exec({
    session,
    optionId,
  });

  return resultSchema.parseAsync({
    option: option,
  });
};
