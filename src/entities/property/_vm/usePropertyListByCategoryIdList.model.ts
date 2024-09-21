"use client";
import { CategoryDefaultSelectOption } from "@/kernel/domain/category/form.schema";
import { usePropertyWithRelationByCategoryQuery } from "../_query/property/propertyListWithRelationByCategory.query";
import { PropertyDefaultSelectOption } from "@/kernel/domain/property/form.schema";

export const usePropertyListByCategoryIdListModel = (
  categoryList: Array<CategoryDefaultSelectOption>,
) => {
  const { isPending, isSuccess, propertyList, isFetchedAfterMount } =
    usePropertyWithRelationByCategoryQuery({
      categoryIdList: categoryList.map(({ value }) => ({
        categoryId: value,
      })),
    });

  const propertyListCompleted: Array<PropertyDefaultSelectOption> =
    propertyList.map((property) => {
      return {
        value: property.id,
        label: property.name,
        datatype: property.datatype,
        // propertyList: property.propertyItemList.map((item) => ({
        //   value: item.id,
        //   label: item.name,
        // })),
      };
    });

  console.log("output_log: DATA **** =>>>", propertyListCompleted);

  return {
    isPending,
    isSuccess,
    propertyList: propertyListCompleted,
    // propertyList,
    categoryIdList: categoryList,
    isFetchedAfterMount,
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
