import { usePropertyListQuery } from "../_query/property/propertyList.query";

export const usePropertyListToSelectModel = () => {
  const { propertyList, isPending } = usePropertyListQuery();

  const propertySelectOptionList = propertyList.map((item) => ({
    value: item.id,
    label: item.name,
    datatype: item.datatype,
  }));

  return {
    propertySelectOptionList,
    isPending,
  };
};
