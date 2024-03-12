import { useCallback } from "react";
import { MultiSelectOptionItem } from "../ui/multiSelect";

type DataOptionItem = { id: string; name: string };

export const useOptionListTransform = () => {
  return {
    toOptionList: useCallback(
      (dataList: Array<DataOptionItem>) =>
        dataList.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      [],
    ),
    toOptionListWithActive: useCallback(
      (dataList: Array<DataOptionItem>, activeList: Array<DataOptionItem>) =>
        dataList.map((item) => ({
          value: item.id,
          label: item.name,
          active: activeList.some((activeItem) => activeItem.id === item.id),
        })),
      [],
    ),
    toDataIdList: useCallback((optionList: Array<MultiSelectOptionItem>) => {
      const res = optionList.map((item) => ({
        id: item.value,
        name: item.label,
      }));

      return res;
    }, []),
  };
};
