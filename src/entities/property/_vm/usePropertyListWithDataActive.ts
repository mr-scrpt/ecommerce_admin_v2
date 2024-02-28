import { PropertyToSelect } from "../_domain/property/types";
import { PropertyItemRelation } from "../_domain/propertyItem/types";

type PropertyListWithDataActive = {
  propertyList: PropertyToSelect[];
  propertyItemListSelected: Array<PropertyItemRelation>;
};
export const usePropertyListWithDataActive = (
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

    // propertyList: property.propertyList.map((item) => ({
    //   ...item,
    //   active:
    //     propertyItemListSelected.find(
    //       (activeItem) => activeItem.id === item.value,
    //     ) !== undefined,
    // })),
  }));

  // console.log("output_log: 1 = propertyList =>>>", propertyList);
  // console.log(
  //   "output_log: 2 = propertyItemListSelected =>>>",
  //   propertyItemListSelected,
  // );
  // console.log("output_log: 3 = transformedPropertys =>>>", transformedPropertys);

  return {
    propertyListWithDataActive: transformedPropertys,
  };
  // const propertyListCompleted = propertyList.map((property) => ({
  //   id: property.id,
  //   name: property.name,
  //   datatype: property.datatype,
  //   propertyList: toPropertyList(property.propertyItemList),
  // }));

  // return {
  //   isPending,
  //   isSuccess,
  //   propertyList: propertyListCompleted,
  //   isFetchedAfterMount,
  //   setCategoryIdList,
  // };
};
