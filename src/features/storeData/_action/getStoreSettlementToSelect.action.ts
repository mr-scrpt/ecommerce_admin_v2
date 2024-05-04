"use server";

import { StoreToSelect } from "@/entities/store";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { storeToSelectSchema } from "../_domain/storeData.chema";
import { getStoreSettlementToSelectUseCase } from "../_usecase/instans.usecase";

const propsSchema = z.object({
  settlement: z.string(),
});

const resultSchema = z.object({
  storeList: z.array(storeToSelectSchema),
});

type ResultT = { storeList: StoreToSelect[] };

export const getStoreSettlementToSelectAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { settlement } = props;
  const session = await getAppSessionStrictServer();

  const storeList = await getStoreSettlementToSelectUseCase.exec({
    session,
    settlement,
  });

  return resultSchema.parseAsync({
    storeList,
  });
};
