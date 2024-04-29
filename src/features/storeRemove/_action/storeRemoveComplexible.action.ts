"use server";
import { z } from "zod";

import { Store } from "@/entities/store";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { removeStoreComplexibleUseCase } from "../_useCase/instans.usecase";
import { storeSchema } from "@/entities/store/server";

const propsSchema = z.object({
  storeId: z.string(),
});

const resultSchema = z.object({
  store: storeSchema,
});

type ResultT = { store: Store };

export const removeStoreComplexibleAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { storeId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const store = await removeStoreComplexibleUseCase.exec({
    storeId,
    session,
  });

  return resultSchema.parseAsync({
    store,
  });
};
