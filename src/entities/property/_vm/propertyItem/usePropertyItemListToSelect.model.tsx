import {
  PropertyItemDefaultSelectOption,
  buildPropertyItemOptionsArray,
} from "@/kernel/domain/property/form.schema";
import { usePropertyItemListByPropertyQuery } from "../../_query/propertyItem/propertyItemByProperty.query";

export const usePropertyItemListToSelectModel = (propertyId: string) => {
  const { propertyItemList, isPending, isSuccess } =
    usePropertyItemListByPropertyQuery(propertyId);

  // const propertySelectOptionList: Array<PropertyItemDefaultSelectOption> =
  //   propertyItemList.map((item) => ({
  //     value: item.id,
  //     label: item.name,
  //     propertyId: propertyId,
  //   }));
  const propertySelectOptionList: Array<PropertyItemDefaultSelectOption> =
    buildPropertyItemOptionsArray(propertyItemList);

  return {
    propertySelectOptionList,
    isPending,
    isSuccess,
  };
};
