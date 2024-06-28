"use client";
import { ProductPropertyObjectList } from "@/entities/product";
import { useOptionListTransform } from "@/shared/lib/map";
import { useEffect, useState } from "react";
import { PropertyToSelect } from "../_domain/property/property.types";
import { usePropertyWithRelationByCategoryQuery } from "../_query/property/propertyListWithRelationByCategory.query";
import { PropertyDataTypeEnum } from "@/kernel/domain/property/property.type";
import { PropertyItem } from "@/kernel/domain/property/propertyItem.type";

export const usePropertyListByCategoryIdListModel = (
  categoryIdListActive: Array<{ value: string; label: string }>,
  productPropertyIdListActive: Array<PropertyItem>,
) => {
  const [categoryIdList, setCategoryIdList] = useState<string[]>([]);
  const { toOptionList } = useOptionListTransform();

  useEffect(() => {
    if (!categoryIdListActive) return;
    setCategoryIdList(categoryIdListActive.map((item) => item.value));
  }, [categoryIdListActive, setCategoryIdList]);

  const { isPending, isSuccess, propertyList, isFetchedAfterMount } =
    usePropertyWithRelationByCategoryQuery({
      categoryIdList: categoryIdList.map((id) => ({ categoryId: id })),
    });

  const propertyListCompleted: Array<PropertyToSelect> = propertyList.map(
    (property) => {
      return {
        id: property.id,
        name: property.name,
        datatype: property.datatype,
        propertyList: toOptionList(property.propertyItemList),
      };
    },
  );

  const propertyObjectActive =
    propertyListCompleted.reduce<ProductPropertyObjectList>((acc, curr) => {
      const correspondingItems = productPropertyIdListActive
        .filter((item) => item.propertyId === curr.id)
        .map((item) => item.id);

      if (
        curr.datatype === PropertyDataTypeEnum.CHECKBOX ||
        curr.datatype === PropertyDataTypeEnum.MULT
      ) {
        acc[curr.name] = correspondingItems;
      } else {
        acc[curr.name] = correspondingItems[0];
      }

      return acc;
    }, {});

  return {
    isPending,
    isSuccess,
    propertyList: propertyListCompleted,
    propertyObjectActive,
    categoryIdList,
    isFetchedAfterMount,
    setCategoryIdList,
  };
};

// Задача поменялась, нужно смапить два массива объектов вот первый [
//     {
//         "id": "property_195fsd55846fddew",
//         "name": "Type",
//         "datatype": "checkbox",
//         "propertyList": [
//             {
//                 "value": "propertyItem_333da558waew65HOT",
//                 "label": "Hot",
//             }
//         ]
//     },
//     {
//         "id": "property_11fsddfew7898186",
//         "name": "Color",
//         "datatype": "mult",
//         "propertyList": [
//             {
//                 "value": "propertyItem_8fsddfew7898d857",
//                 "label": "Red",
//             },
//             {
//                 "value": "propertyItem_d555fsddfew78981fe",
//                 "label": "Blue",
//             },
//             {
//                 "value": "propertyItem_rs5fsd55846fptes",
//                 "label": "Yellow",
//             }
//         ]
//     },
//     {
//         "id": "property_585fsddfew7898dd",
//         "name": "Size",
//         "datatype": "select",
//         "propertyList": [
//             {
//                 "value": "propertyItem_58ddtwaew7897dfeXS",
//                 "label": "XS",
//             },
//             {
//                 "value": "propertyItem_d33ddtwaew68deS",
//                 "label": "S",
//             },
//             {
//                 "value": "propertyItem_M68ddtwaew65687M",
//                 "label": "M",
//             },
//             {
//                 "value": "propertyItem_XL33ddtwaew65dd2eeXL",
//                 "label": "XL",
//             }
//         ]
//     }
// ] Вот второй
// [
//     {
//         "id": "propertyItem_8fsddfew7898d857",
//         "name": "Red",
//         "value": "red",
//         "propertyId": "property_11fsddfew7898186"
//     },
//     {
//         "id": "propertyItem_d555fsddfew78981fe",
//         "name": "Blue",
//         "value": "blue",
//         "propertyId": "property_11fsddfew7898186"
//     },
//     {
//         "id": "propertyItem_M68ddtwaew65687M",
//         "name": "M",
//         "value": "m",
//         "propertyId": "property_585fsddfew7898dd"
//     }
// ]
// В результате нужно получить вот это
//   {
//     Color: ["propertyItem_8fsddfew7898d857", "propertyItem_d555fsddfew78981fe"],
//     Size: "propertyItem_M68ddtwaew65687M",
//   },
