"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { optionSchema } from "../../_domain/option/option.schema";
import { OptionEntity } from "../../_domain/types";
import { getOptionUseCase } from "../../_usecase/option/getOption.usecase";

const getByIdSchema = z.object({
  optionId: z.string(),
});

const resultSchema = z.object({
  option: optionSchema,
});

type ResultT = { option: OptionEntity };

export const getOptionAction = async (
  props: z.infer<typeof getByIdSchema>,
): Promise<ResultT> => {
  console.log("output_log: props =>>>", props);
  const { optionId } = getByIdSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const option = await getOptionUseCase.exec({
    session,
    optionId,
  });

  return resultSchema.parseAsync({
    option: option,
  });
};
