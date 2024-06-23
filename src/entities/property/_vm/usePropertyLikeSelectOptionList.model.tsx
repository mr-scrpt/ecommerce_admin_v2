import { useOptionListTransform } from "@/shared/lib/map";
import { usePropertyListQuery } from "../_query/property/propertyList.query";

export const usePropertyLikeSelectOptionListModel = () => {
  const { propertyList, isPending } = usePropertyListQuery();
  const { toOptionList } = useOptionListTransform();

  const propertyListSelect = toOptionList(propertyList);

  return {
    propertySelectOptionList: propertyListSelect,
    isPending,
  };
};
