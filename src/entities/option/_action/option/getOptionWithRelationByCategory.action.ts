"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { optionRelationSchema } from "../../_domain/option/option.schema";
import { OptionRelation } from "../../_domain/option/types";
import { getOptionWithRelationByCategoryUseCase } from "../../_usecase/option/getOptionWithRelationByCategory.usecase";

const getByIdSchema = z.object({
  categoryIdList: z.array(z.string()),
});

const resultSchema = z.object({
  optionList: z.array(optionRelationSchema),
});

type ResultT = { optionList: OptionRelation[] };

export const getOptionWithRelationByCategoryAction = async (
  props: z.infer<typeof getByIdSchema>,
): Promise<ResultT> => {
  const { categoryIdList } = getByIdSchema.parse(props);
  console.log("output_log: list =>>>", categoryIdList);

  const session = await getAppSessionStrictServer();

  const optionList = await getOptionWithRelationByCategoryUseCase.exec({
    session,
    categoryIdList,
  });

  return resultSchema.parseAsync({
    optionList,
  });
};
