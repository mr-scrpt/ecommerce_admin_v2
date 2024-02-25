import { OptionSelect } from "../_domain/option/types";
import { OptionItemRelation } from "../_domain/optionItem/types";

type OptionListWithDataActive = {
  optionList: OptionSelect[];
  optionItemListSelected: Array<OptionItemRelation>;
};
export const useOptionListWithDataActive = (data: OptionListWithDataActive) => {
  const { optionList, optionItemListSelected } = data;
  console.log("output_log:  =>>>", optionList, optionItemListSelected);
  const transformedOptions = optionList.map((option) => ({
    ...option,
    optionList: option.optionList.map((item) => ({
      ...item,
      active:
        optionItemListSelected.find(
          (activeItem) => activeItem.id === item.value,
        ) !== undefined,
    })),
  }));

  return {
    optionListWithDataActive: transformedOptions,
  };
  // const optionListCompleted = optionList.map((option) => ({
  //   id: option.id,
  //   name: option.name,
  //   datatype: option.datatype,
  //   optionList: toOptionList(option.optionItemList),
  // }));

  // return {
  //   isPending,
  //   isSuccess,
  //   optionList: optionListCompleted,
  //   isFetchedAfterMount,
  //   setCategoryIdList,
  // };
};
