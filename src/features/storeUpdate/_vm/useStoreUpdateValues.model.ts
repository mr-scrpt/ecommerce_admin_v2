import { useStoreWithRelationQuery } from "@/entities/store/_query/storeWithRelation.query";
import { buildSettlementOption } from "@/kernel/domain/settlement/form.schema";
import { StoreUpdateFormValues } from "../_domain/form.schema";

interface StoreDefaultValueProps {
  storeId: string;
}

export const useStoreUpdateValues = (props: StoreDefaultValueProps) => {
  const { storeId } = props;

  const {
    store,
    isPending: isPendingStore,
    isFetchedAfterMount: isFetchedAfterMountStore,
    isSuccess: isSuccessStore,
  } = useStoreWithRelationQuery(storeId);

  const { name, addressLine, settlement } = store || {};
  const storeUpdateValues: StoreUpdateFormValues = {
    name: name || "",
    addressLine: addressLine || "",
    settlement: buildSettlementOption(settlement),
  };

  return {
    storeUpdateValues,
    isPendingStore,
    isFetchedAfterMountStore,
    isSuccessStore,
  };
};
