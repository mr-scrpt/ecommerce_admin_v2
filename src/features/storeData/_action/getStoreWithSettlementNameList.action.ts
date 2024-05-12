"use server";

import { z } from "zod";
import { StoreWithSettlementName } from "@/entities/store";
import { getStoreListWithSettlementNameUseCase } from "../_usecase/instans.usecase";
import { storeWithSettlementNameSchema } from "@/entities/store/server";
import { SessionContainer } from "@/shared/session/instans";

const resultSchema = z.object({
  storeList: z.array(storeWithSettlementNameSchema),
});

type ResultT = { storeList: StoreWithSettlementName[] };

export const getStoreWithSettlementNameListAction =
  async (): Promise<ResultT> => {
    const session = await SessionContainer.getStrict();

    const storeList = await getStoreListWithSettlementNameUseCase.exec({
      session,
    });

    return resultSchema.parseAsync({
      storeList,
    });
  };
