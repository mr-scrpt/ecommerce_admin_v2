import { SettleToSelect } from "../_domain/ui.type";
import { useSettlementListSearchToSelectQuery } from "../_query/getSettlementListSearch.query";

export const useSettlemetListToSelect = (settlementDefault: string = "") => {
  const { toSearch, settlementList, isPending, isSuccess } =
    useSettlementListSearchToSelectQuery(settlementDefault);

  const settlementListToSelect = settlementList.map<SettleToSelect>(
    (settlement) => ({
      value: settlement.ref,
      area: settlement.areaDescription,
      region: settlement.regionsDescription,
      label: settlement.description,
    }),
  );

  return {
    toSearch,
    settlementListToSelect,
    isPending,
    isSuccess,
  };
};
