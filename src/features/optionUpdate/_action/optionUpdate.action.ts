"use server";
import { z } from "zod";

import {
  OptionEntity,
  optionSchema,
  optionUpdateSchema,
} from "@/entities/option";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { updateOptionComplexibleUseCase } from "../_useCase/optionUpdateComplexible.usecase";

const propsSchema = z.object({
  optionId: z.string(),
  data: optionUpdateSchema,
});

const resultSchema = z.object({
  option: optionSchema,
});

export const updateOptionAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<{ option: OptionEntity }> => {
  const { optionId, data } = propsSchema.parse(props);
  const { optionItemList: optionItemListData, ...optionData } = data;
  console.log("output_log: optionItemListData =>>>", optionItemListData);

  const session = await getAppSessionStrictServer();

  const option = await updateOptionComplexibleUseCase.exec({
    session,
    dataToUpdate: {
      optionId,
      optionData,
      optionItemListData,
    },
  });

  return resultSchema.parseAsync({
    option,
  });
};
