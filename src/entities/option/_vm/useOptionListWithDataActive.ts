import { OptionSelect } from "../_domain/option/types";
import { OptionItemRelation } from "../_domain/optionItem/types";

type OptionListWithDataActive = {
  optionList: OptionSelect[];
  optionItemListSelected: Array<OptionItemRelation>;
};
export const useOptionListWithDataActive = (data: OptionListWithDataActive) => {
  const { optionList, optionItemListSelected } = data;

  const transformedOptions = optionList.map((option) => ({
    ...option,
    optionList: option.optionList.filter((item) =>
      optionItemListSelected.find((activeItem) => activeItem.id === item.value),
    ),

    // optionList: option.optionList.map((item) => ({
    //   ...item,
    //   active:
    //     optionItemListSelected.find(
    //       (activeItem) => activeItem.id === item.value,
    //     ) !== undefined,
    // })),
  }));

  console.log("output_log: 1 = optionList =>>>", optionList);
  console.log(
    "output_log: 2 = optionItemListSelected =>>>",
    optionItemListSelected,
  );
  console.log("output_log: 3 = transformedOptions =>>>", transformedOptions);

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
