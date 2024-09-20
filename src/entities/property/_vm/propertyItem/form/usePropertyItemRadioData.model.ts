import { useCallback, useMemo } from "react";
import { usePropertyItemListToSelectModel } from "../usePropertyItemListToSelect.model";
import { PropertyItemDefaultSelectOption } from "@/kernel/domain/property/form.schema";

export interface IProps {
  propertyId: string;
  onSelectPropertyItem: (
    propertyItemList: Array<PropertyItemDefaultSelectOption>,
  ) => void;
  propertyItemListActive: Array<PropertyItemDefaultSelectOption>;
}

export const usePropertyItemRadioDataModel = (props: IProps) => {
  const { propertyItemListActive, onSelectPropertyItem, propertyId } = props;

  const { propertySelectOptionList, isPending, isSuccess } =
    usePropertyItemListToSelectModel(propertyId);

  const placeholder = isPending ? "Loading..." : "Select propertyItem";

  const handleSelect = useCallback(
    (propertyItemList: Array<PropertyItemDefaultSelectOption>) => {
      const [newPropertyItem] = propertyItemList; // Предполагаем, что выбирается один элемент

      if (!newPropertyItem) return; // Если ничего не выбрано, выходим

      const updatedList = propertyItemListActive.filter(
        (item) => item.propertyId !== propertyId,
      );
      onSelectPropertyItem([...updatedList, newPropertyItem]);
    },
    [propertyId, onSelectPropertyItem, propertyItemListActive],
  );

  const propertyItemActiveFiltered = useMemo(
    () =>
      propertyItemListActive.find((item) => item.propertyId === propertyId) ||
      null,
    [propertyId, propertyItemListActive],
  );

  return {
    propertySelectOptionList,
    propertyItemActiveFiltered,
    handleSelect,
    isPending,
    isSuccess,
    placeholder,
  };
};
