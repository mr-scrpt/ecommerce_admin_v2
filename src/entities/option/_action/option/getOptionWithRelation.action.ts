"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { optionRelationSchema } from "../../_domain/option/option.schema";
import { OptionRelationEntity } from "../../_domain/types";
import { getOptionWithRelationUseCase } from "../../_usecase/option/getOptionWithRelation.usecase";

const getByIdSchema = z.object({
  optionId: z.string(),
});

const resultSchema = z.object({
  option: optionRelationSchema,
});

type ResultT = { option: OptionRelationEntity };

export const getOptionWithRelationAction = async (
  props: z.infer<typeof getByIdSchema>,
): Promise<ResultT> => {
  const { optionId } = getByIdSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const option = await getOptionWithRelationUseCase.exec({
    session,
    optionId,
  });

  return resultSchema.parseAsync({
    option: option,
  });
};
