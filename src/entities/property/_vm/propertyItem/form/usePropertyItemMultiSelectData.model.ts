import { useCallback, useMemo } from "react";
import { usePropertyItemListToSelectModel } from "../usePropertyItemListToSelect.model";
import { PropertyItemDefaultSelectOption } from "@/kernel/domain/property/form.schema";

export interface IProps {
  propertyId: string;
  onSelectPropertyItem: (
    propertyList: Array<PropertyItemDefaultSelectOption>,
  ) => void;
  propertyItemListActive: Array<PropertyItemDefaultSelectOption>;
}
export const usePropertyItemMultiSelectDataModel = (props: IProps) => {
  const { propertyId, onSelectPropertyItem, propertyItemListActive } = props;
  const { propertySelectOptionList, isSuccess, isPending } =
    usePropertyItemListToSelectModel(propertyId);

  const propertyItemActiveListFiltered = useMemo(
    () =>
      propertyItemListActive.filter(
        (propertyItem) => propertyItem.propertyId === propertyId,
      ),
    [propertyItemListActive, propertyId],
  );

  const handleSelect = useCallback(
    (selectedItems: Array<PropertyItemDefaultSelectOption>) => {
      const updatedList = propertyItemListActive.filter(
        (item) => item.propertyId !== propertyId,
      );
      onSelectPropertyItem([...updatedList, ...selectedItems]);
    },
    [propertyId, propertyItemListActive, onSelectPropertyItem],
  );

  return {
    propertySelectOptionList,
    propertyItemActiveListFiltered,
    handleSelect,
    isPending,
    isSuccess,
  };
};
