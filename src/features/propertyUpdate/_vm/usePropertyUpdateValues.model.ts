import { usePropertyItemListByPropertyModel } from "@/entities/property";
import { usePropertyModel } from "@/entities/property/_vm/useProperty.model";
import {
  buildPropertyDataTypeOptionsArray,
  buildPropertyItemOptionsArray,
} from "@/kernel/domain/property/form.schema";
import { PropertyUpdateFormValues } from "../_domain/form.schema";

export const usePropertyUpdateValues = (propertyId: string) => {
  const {
    property,
    isSuccessProperty,
    isAppearancePendingProperty,
    isFetchedAfterMountProperty,
  } = usePropertyModel(propertyId);

  const {
    propertyItemList,
    isSuccessPropertyItemList,
    isAppearancePendingPropertyItemList,
    isFetchedAfterMountPropertyItemList,
  } = usePropertyItemListByPropertyModel(propertyId);

  const propertyUpdateValues: PropertyUpdateFormValues = {
    name: property?.name || "",
    datatypeList: buildPropertyDataTypeOptionsArray([property]),
    propertyItemList: buildPropertyItemOptionsArray(propertyItemList),
  };

  console.log(
    "output_log: PropertyUpdateFormValues =>>>",
    propertyUpdateValues,
  );

  const isPendingCombined =
    isAppearancePendingProperty || isAppearancePendingPropertyItemList;
  const isFetchedAfterMountCombinde =
    isFetchedAfterMountProperty && isFetchedAfterMountPropertyItemList;

  const isSuccessCombined = isSuccessProperty && isSuccessPropertyItemList;

  return {
    propertyUpdateValues,
    isPending: isPendingCombined,
    isFetchedAfterMount: isFetchedAfterMountCombinde,
    isSuccess: isSuccessCombined,
  };
};
