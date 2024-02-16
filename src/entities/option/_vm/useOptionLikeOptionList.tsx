import { useOptionListQuery } from "..";
import { useOptionListTransformOption } from "./useOptionListTransformOption";

export const useOptionLikeOptionList = () => {
  const { optionList, isPending } = useOptionListQuery();
  const { toOptionList } = useOptionListTransformOption();

  const optionList = toOptionList(optionList);

  return {
    optionOptionList: optionList,
    isPending,
  };
};
