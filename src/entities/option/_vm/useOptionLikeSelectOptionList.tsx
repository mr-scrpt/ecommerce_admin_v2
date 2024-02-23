import { useOptionListTransform } from "@/shared/lib/map";
import { useOptionListQuery } from "..";

export const useOptionLikeSelectOptionList = () => {
  const { optionList, isPending } = useOptionListQuery();
  const { toOptionList } = useOptionListTransform();

  const optionListSelect = toOptionList(optionList);

  return {
    optionSelectOptionList: optionListSelect,
    isPending,
  };
};
