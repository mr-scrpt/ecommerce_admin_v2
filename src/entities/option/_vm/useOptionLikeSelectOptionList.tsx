import { useOptionListQuery } from "..";
import { useOptionListTransformOption } from "./useOptionListTransformOption";

export const useOptionLikeSelectOptionList = () => {
  const { optionList, isPending } = useOptionListQuery();
  const { toOptionList } = useOptionListTransformOption();

  const optionListSelect = toOptionList(optionList);

  return {
    optionSelectOptionList: optionListSelect,
    isPending,
  };
};
