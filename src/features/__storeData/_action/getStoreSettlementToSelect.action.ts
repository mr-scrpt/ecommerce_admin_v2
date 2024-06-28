"use server";

import { StoreToSelect } from "@/entities/store";
import { z } from "zod";
import { storeToSelectSchema } from "../_domain/storeData.chema";
import { getStoreSettlementToSelectUseCase } from "../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

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
  const session = await SessionContainer.getStrict();

  const storeList = await getStoreSettlementToSelectUseCase.exec({
    session,
    settlement,
  });

  return resultSchema.parseAsync({
    storeList,
  });
};
