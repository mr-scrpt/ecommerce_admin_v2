import { useOptionListTransform } from "@/shared/lib/map";
import { usePropertyListQuery } from "..";

export const usePropertyLikeSelectOptionList = () => {
  const { propertyList, isPending } = usePropertyListQuery();
  const { toOptionList } = useOptionListTransform();

  const propertyListSelect = toOptionList(propertyList);

  return {
    propertySelectPropertyList: propertyListSelect,
    isPending,
  };
};
