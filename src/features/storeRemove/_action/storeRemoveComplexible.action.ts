"use server";
import { z } from "zod";

import { Store } from "@/entities/store";
import { removeStoreComplexibleUseCase } from "../_useCase/instans.usecase";
import { storeSchema } from "@/entities/store/server";
import { SessionContainer } from "@/shared/session/instans";

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

  const session = await SessionContainer.getStrict();

  const store = await removeStoreComplexibleUseCase.exec({
    storeId,
    session,
  });

  return resultSchema.parseAsync({
    store,
  });
};
