"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { optionSchema } from "../../_domain/option/option.schema";
import { Option } from "../../_domain/option/types";
import { getOptionListUseCase } from "../../_usecase/option/getOptionList.usecase";

const resultSchema = z.object({
  optionList: z.array(optionSchema),
});

type ResultT = { optionList: Option[] };

export const getOptionListAction = async (): Promise<ResultT> => {
  const session = await getAppSessionStrictServer();

  const optionList = await getOptionListUseCase.exec({ session });

  return resultSchema.parseAsync({
    optionList: optionList,
  });
};
