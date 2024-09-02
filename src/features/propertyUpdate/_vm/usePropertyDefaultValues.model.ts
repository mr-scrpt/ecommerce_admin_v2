import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { Property } from "@/kernel/domain/property/property.type";
import { PropertyItem } from "@/kernel/domain/property/propertyItem.type";
import { useMemo } from "react";

// const defaultValues: PropertyUpdateFormValues = {
//   name: property?.name,
//   datatypeList: [{ label: property?.datatype, value: property?.datatype }],
//   propertyItemList: propertyItemList.map((item) => ({
//     value: item.value,
//     label: item.name,
//     id: item.id,
//   })),
// };

interface PropertyDefaultValueProps {
  property: Property | null;
  propertyList: Array<PropertyItem>;
}

export const usePropertyDefaultValues = (props: PropertyDefaultValueProps) => {
  const { property, propertyList } = props;
  return useMemo(() => {
    if (!property) {
      return {
        name: "",
        datatypeList: [],
        propertyItemList: [],
      };
    }

    return {
      name: property.name,
      datatypeList: [{ label: property.datatype, value: property.datatype }],
      propertyItemList: propertyList.map((item) => ({
        value: item.value,
        label: item.name,
        id: item.id,
      })),
    };
  }, [property, propertyList]);
};
