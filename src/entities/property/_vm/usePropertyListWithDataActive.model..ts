import { PropertyToSelect } from "../_domain/property/property.types";
import { PropertyItemRelation } from "../_domain/propertyItem/propertyItem.types";

type PropertyListWithDataActive = {
  propertyList: PropertyToSelect[];
  propertyItemListSelected: Array<PropertyItemRelation>;
};
export const usePropertyListWithDataActiveModel = (
  data: PropertyListWithDataActive,
) => {
  const { propertyList, propertyItemListSelected } = data;

  const transformedPropertys = propertyList.map((property) => ({
    ...property,
    propertyList: property.propertyList.filter((item) =>
      propertyItemListSelected.find(
        (activeItem) => activeItem.id === item.value,
      ),
    ),
  }));

  return {
    propertyListWithDataActive: transformedPropertys,
  };
};
