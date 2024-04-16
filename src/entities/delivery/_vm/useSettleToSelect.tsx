// import { useEffect, useState } from "react";
// import { SettleToSelect } from "../_domain/delivery.types";
// import { useSettlementListSearchToSelectQuery } from "..";
//
// export const useSettleToSelect = () => {
//   const [deliverySelect, setDeliverySelect] = useState<Array<SettleToSelect>>(
//     [],
//   );
//   const { toSearch, settlementListToSelect } = useSettlementListSearchToSelectQuery();
//
//   useEffect(() => {
//     if (settlementList) {
//       setDeliverySelect(
//         settlementList.map((settlement) => {
//           return {
//             value: settlement.id,
//             area: settlement.area,
//             label: settlement.area,
//           };
//         }),
//       );
//     }
//   }, [settlementList]);
//   return {
//     toSearch,
//     deliverySelect,
//   };
// };
