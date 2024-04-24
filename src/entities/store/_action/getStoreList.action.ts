"use server";

import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { storeSchema } from "../_domain/store.schema";
import { Store } from "../_domain/types";
import { getStoreListUseCase } from "../_usecase/instans.usecase";

const resultSchema = z.object({
  storeList: z.array(storeSchema),
});

type ResultT = { storeList: Store[] };

export const getStoreListAction = async (): Promise<ResultT> => {
  const session = await getAppSessionStrictServer();

  const storeList = await getStoreListUseCase.exec({ session });

  return resultSchema.parseAsync({
    storeList,
  });
};
