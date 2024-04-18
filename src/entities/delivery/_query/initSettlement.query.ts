"use client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { initSettlementListAction } from "../../settlement/_action/initSettlementList";
import { baseQueryKey } from "../_domain/delivery.types";

const QUERY_KEY = "initSettlement";
export const initSettlementQuery = () =>
  queryOptions({
    queryKey: [baseQueryKey, QUERY_KEY],
    queryFn: () => initSettlementListAction(),
  });

export const useInitSettlementQuery = () => {
  const query = initSettlementQuery();
  useQuery(query);
};
