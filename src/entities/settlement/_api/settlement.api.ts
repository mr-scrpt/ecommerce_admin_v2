import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { SettlementController } from "../_controller/settlement.controller";

export const settlementApi = createApi<SettlementController["router"]>();

export const settlementHttpApi =
  createHttpApi<SettlementController["router"]>();
