import { MultiSelectOptionItem } from "../ui/multiSelect";

type DataOptionItem = { id: string; name: string };

export const useOptionListTransform = () => {
  return {
    toOptionList: (dataList: Array<DataOptionItem>) =>
      dataList.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    toOptionListWithActive: (
      dataList: Array<DataOptionItem>,
      activeList: Array<DataOptionItem>,
    ) =>
      dataList.map((item) => ({
        value: item.id,
        label: item.name,
        active: activeList.some((activeItem) => activeItem.id === item.id),
      })),
    toDataIdList: (optionList: Array<MultiSelectOptionItem>) => {
      const res = optionList.map((item) => ({
        id: item.value,
        name: item.label,
      }));

      return res;
    },
  };
};
