"use server";
import { z } from "zod";

import { Store } from "@/entities/store";
import { storeSchema } from "@/entities/store/server";
import { storeUpdateSchema } from "../_domain/schema";
import { updateStoreComplexibleUseCase } from "../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

const propsSchema = z.object({
  storeId: z.string(),
  data: storeUpdateSchema,
});

const resultSchema = z.object({
  store: storeSchema,
});

type ResultT = { store: Store };

export const updateStoreAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { storeId, data } = propsSchema.parse(props);

  const session = await SessionContainer.getStrict();

  const store = await updateStoreComplexibleUseCase.exec({
    session,
    dataToUpdate: {
      storeId,
      storeData: data,
    },
  });

  return resultSchema.parseAsync({
    store,
  });
};
