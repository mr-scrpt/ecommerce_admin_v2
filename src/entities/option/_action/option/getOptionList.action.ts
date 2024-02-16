"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { optionSchema } from "../../_domain/option/option.schema";
import { OptionEntity } from "../../_domain/types";
import { getOptionListUseCase } from "../../_usecase/option/getOptionList.usecase";

// const resultSchema = z.object({
//   optionList: z.array(optionSchema),
// });

type ResultT = { optionList: OptionEntity[] };

export const getOptionListAction = async (): Promise<ResultT> => {
  const session = await getAppSessionStrictServer();

  const optionList = await getOptionListUseCase.exec({ session });
  console.log("output_log:  =>>>", optionList);

  return { optionList: [] };
  // return resultSchema.parseAsync({
  //   optionList: optionList,
  // });
};
