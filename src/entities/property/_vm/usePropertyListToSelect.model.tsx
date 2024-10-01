import { buildPropertyOptionsArray } from "@/kernel/domain/property/form.schema";
import { usePropertyListQuery } from "../_query/property/propertyList.query";

export const usePropertyListToSelectModel = () => {
  const { propertyList, isPending } = usePropertyListQuery();

  const propertySelectOptionList = buildPropertyOptionsArray(propertyList);

  return {
    propertySelectOptionList,
    isPending,
  };
};
