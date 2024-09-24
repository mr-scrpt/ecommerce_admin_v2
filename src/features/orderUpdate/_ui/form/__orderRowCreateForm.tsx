// import { OrderFormElements } from "@/entities/order/_ui/order/form/orderFormElements";
// import { ProductFormElements } from "@/entities/product";
// import { useRouter } from "next/navigation";
// import { FC, HTMLAttributes } from "react";
// import { useOrderWithRelationModel } from "@/entities/order";
// import { useOrderDefaultValues } from "../../_vm/useOrderDefaultValues.model";
// import {
//   OrderRowCreateFormValues,
//   OrderUpdateFormValues,
// } from "../../_domain/form.schema";
// import { useOrderUpdateMutation } from "../../_mutation/useOrderUpdate.mutation";
// import { useOrderRowCreateMutation } from "../../_mutation/useOrderRowCreate.mutation";
//
// interface OrderRowCreateFromProps extends HTMLAttributes<HTMLDivElement> {
//   orderId: string;
//   callbackUrl?: string;
//   className?: string;
//   onSuccess?: () => void;
// }
//
// export const OrderRowCreateForm: FC<OrderRowCreateFromProps> = (props) => {
//   const { orderId, className, callbackUrl, onSuccess } = props;
//
//   const { order, isSuccess, isPending } = useOrderWithRelationModel(orderId);
//
//   const router = useRouter();
//
//   const defaultValues = useOrderDefaultValues(order);
//
//   const { orderRowCreate } = useOrderRowCreateMutation();
//   const handleSubmit = async (data: OrderRowCreateFormValues) => {
//     // await orderRowCreate({
//     //   selector: { orderId },
//     //   orderRowData: data,
//     // });
//     //
//     // onSuccess?.();
//     //
//     // if (callbackUrl) {
//     //   router.push(callbackUrl);
//     // }
//   };
//
//   return (
//     <ProductFormElements handleSubmit={handleSubmit}>
//       <ProductFormElements.FieldProductSelectGroupSearch
//         productInOrder={
//           order?.orderRowList.map(({ productId }) => productId) ?? []
//         }
//       />
//     </ProductFormElements>
//   );
// };
