"use client";
import { useQuery } from "@tanstack/react-query";
import { initSettlementListAction } from "../_action/initSettlementList";
import { baseQueryKey } from "../_domain/delivery.types";

const QUERY_KEY = "initSettlement";
export const initSettlementQuery = () => ({
  queryKey: [baseQueryKey, QUERY_KEY],
  queryFn: () => initSettlementListAction(),
});

export const useInitSettlementQuery = () => {
  const query = initSettlementQuery();
  useQuery(query);
};
