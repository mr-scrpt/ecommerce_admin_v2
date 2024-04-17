"use server";
import { getAppSessionStrictServer } from "@/shared/session/server";
import { z } from "zod";
import { getSettlementListSearchToSelectUseCase } from "../_usecase/instans.usecase";
import { SettleToSelect } from "../_domain/delivery.types";
import { settleToSelectSchema } from "../_domain/delivery.schema";

const propsSchema = z.object({
  q: z.string(),
});

const resultSchema = z.object({
  settlementListToSelect: settleToSelectSchema.array(),
});

type ResultT = { settlementListToSelect: Array<SettleToSelect> };

export const getSettlementListSearchToSelectAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { q } = propsSchema.parse(props);
  const session = await getAppSessionStrictServer();

  const settlementListToSelect =
    await getSettlementListSearchToSelectUseCase.exec({
      q,
      session,
    });

  return resultSchema.parseAsync({
    settlementListToSelect,
  });
};
