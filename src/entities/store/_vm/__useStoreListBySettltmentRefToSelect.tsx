import { useOptionListTransform } from "@/shared/lib/map";
import { useStoreListQuery } from "../_query/storeList.query";

export const useStoreListBySettltmentRefToSelect = () => {
  const { storeList, isPending } = useStoreListQuery();
  const { toOptionList } = useOptionListTransform();

  const optionListSelect = toOptionList(storeList);

  return {
    storeSelectOptionList: optionListSelect,
    isPending,
  };
};
