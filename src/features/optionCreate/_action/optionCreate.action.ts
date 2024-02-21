"use server";

import { optionCreateSchema, Option } from "@/entities/option";
import { optionRelationSchema } from "@/entities/option/_domain/option/option.schema";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { createOptionComplexibleUseCase } from "../_useCase/optionCreateComplexible.usecase";

const propsSchema = z.object({
  data: optionCreateSchema,
});

const resultSchema = z.object({
  option: optionRelationSchema,
});

type ResultT = { option: Option };

export const optionCreateAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { data } = propsSchema.parse(props);
  const { optionItemList, ...optionData } = data;

  const session = await getAppSessionStrictServer();

  const option = await createOptionComplexibleUseCase.exec({
    session,
    dataToCreate: {
      optionItemListData: optionItemList,
      optionData: optionData,
    },
  });

  return resultSchema.parseAsync({
    option,
  });
};
