// import { useCallback } from "react";
// import { DefaultSelectOption } from "../type/select";
//
// export const useOptionListTransform = () => {
//   return {
//     toOptionList: useCallback(
//       (dataList: Array<DefaultSelectOption>): Array<DefaultSelectOption> => {
//         if (!dataList) {
//           return [];
//         }
//         return dataList.map((item) => ({
//           value: item.id,
//           label: item.name,
//         }));
//       },
//       [],
//     ),
//     toOptionListWithActive: useCallback(
//       (
//         dataList: Array<DefaultSelectOption>,
//         activeList: Array<DefaultSelectOption>,
//       ) => {
//         if (!dataList) {
//           return [];
//         }
//
//         return dataList.map((item) => ({
//           value: item.id,
//           label: item.name,
//           active: activeList.some((activeItem) => activeItem.id === item.id),
//         }));
//       },
//       [],
//     ),
//     toDataIdList: useCallback(
//       (optionList: Array<DefaultSelectOption>): Array<DataOptionItem> => {
//         // console.log("output_log: 2 >>> toDataIdList =>>>", optionList);
//         const res = optionList.map((item) => ({
//           id: item.value,
//           name: item.label,
//         }));
//
//         return res;
//       },
//       [],
//     ),
//   };
// };
