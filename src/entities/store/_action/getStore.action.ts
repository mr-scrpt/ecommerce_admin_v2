"use server";
import { z } from "zod";
import { storeSchema } from "../_domain/store.schema";
import { Store } from "../_domain/types";
import { getStoreUseCase } from "../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

const propsSchema = z.object({
  storeId: z.string(),
});

const resultSchema = z.object({
  store: storeSchema,
});

type ResultT = { store: Store };

export const getStoreAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { storeId } = propsSchema.parse(props);

  const session = await SessionContainer.getStrict();

  const store = await getStoreUseCase.exec({
    session,
    storeId,
  });

  return resultSchema.parseAsync({
    store: store,
  });
};
