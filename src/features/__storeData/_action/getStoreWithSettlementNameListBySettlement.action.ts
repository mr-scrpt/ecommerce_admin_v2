"use server";

import { StoreWithSettlementName } from "@/entities/store";
import { storeWithSettlementNameSchema } from "@/entities/store/server";
import { z } from "zod";
import { getStoreListWithSettlementNameBySettlementUseCase } from "../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

const propsSchema = z.object({
  settlement: z.string(),
});

const resultSchema = z.object({
  storeList: z.array(storeWithSettlementNameSchema),
});

type ResultT = { storeList: StoreWithSettlementName[] };

export const getStoreWithSettlementNameListBySettlementAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { settlement } = props;
  const session = await SessionContainer.getStrict();

  const storeList =
    await getStoreListWithSettlementNameBySettlementUseCase.exec({
      session,
      settlement,
    });

  return resultSchema.parseAsync({
    storeList,
  });
};
