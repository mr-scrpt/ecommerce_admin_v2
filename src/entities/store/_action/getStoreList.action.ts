"use server";

import { z } from "zod";
import { storeSchema } from "../_domain/store.schema";
import { Store } from "../_domain/types";
import { getStoreListUseCase } from "../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

const resultSchema = z.object({
  storeList: z.array(storeSchema),
});

type ResultT = { storeList: Store[] };

export const getStoreListAction = async (): Promise<ResultT> => {
  // const session = await getAppSessionStrictServer();
  const session = await SessionContainer.getStrict();

  const storeList = await getStoreListUseCase.exec({ session });
  console.log("output_log:  =>>>", storeList);

  return resultSchema.parseAsync({
    storeList,
  });
};
