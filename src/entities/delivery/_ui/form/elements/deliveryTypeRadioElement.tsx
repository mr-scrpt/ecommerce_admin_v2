// import { FC, memo } from "react";
//
// import { SelectOptionItem } from "@/shared/type/select";
// import { SelectElement } from "@/shared/ui/select/selectElement";
// import { HTMLAttributes } from "react";
// import { useDeliveryTypeListToSelectModel } from "../../../_vm/useDeliveryTypeListToSelect.modle";
// import { RadioGroup } from "@/shared/ui/radio-group";
//
// export interface DeliveryTypeSelectProps
//   extends HTMLAttributes<HTMLDivElement> {
//   deliveryActive?: SelectOptionItem;
//   onSelectDelivery: (deliveryList: Array<SelectOptionItem>) => void;
// }
//
// export const DeliveryTypeSelectElement: FC<DeliveryTypeSelectProps> = memo(
//   (props) => {
//     const { deliveryActive, onSelectDelivery } = props;
//
//     const { deliveryTypeAvailablList: deliveryTypeListToSelect } = useDeliveryTypeListToSelectModel();
//
//     const placeholder = "Select delivery type";
//
//     return (
//       <RadioGroup
//         onValueChange={onChangeDeliveryType}
//         defaultValue={deliveryType}
//         value={deliveryType}
//         className="flex flex-col space-y-1"
//       >
//         {Object.entries(DeliveryTypeFieldList).map(([key, row]) => {
//           if (key === DeliveryTypeEnum.POST && isPostAvailable) {
//             return (
//               <DeliveryPostSelect
//                 key={key}
//                 delivery={row}
//                 selected={deliveryType === DeliveryTypeEnum.POST}
//               />
//             );
//           }
//           if (key === DeliveryTypeEnum.PICKUP && isStoreAvailable) {
//             return (
//               <DeliveryStoreField
//                 key={key}
//                 delivery={row}
//                 selected={deliveryType === DeliveryTypeEnum.PICKUP}
//               />
//             );
//           }
//           if (key === DeliveryTypeEnum.COURIER && isCourierAvailable) {
//             return (
//               <DeliveryCourierField
//                 key={key}
//                 delivery={row}
//                 selected={deliveryType === DeliveryTypeEnum.COURIER}
//               />
//             );
//           }
//         })}
//       </RadioGroup>
//     );
//   },
// );
//
// DeliveryTypeSelectElement.displayName = "DeliverySelectElement";
