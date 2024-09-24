// import { useOrderWithRelationQuery } from "@/entities/order";
// import { useProductListSearchQuery } from "@/entities/product";
//
// // TODO: This hook is duplicated in create row - maybe move in entity?
// export const useOrderProductListToSelectModel = (orderId: string) => {
//   const {
//     data: productData,
//     isPending: isProductPending,
//     searchValue,
//     toSearch,
//   } = useProductListSearchQuery();
//
//   const { order, isPending: isOrderPending } =
//     useOrderWithRelationQuery(orderId);
//
//   const productList = productData?.map((item) => ({
//     label: item.name,
//     value: item.id,
//     disabled: !!order?.orderRowList.find((row) => {
//       return row.productId === item.id;
//     }),
//     inStock: !!item.inStock,
//   }));
//
//   return {
//     toSearch,
//     searchValue,
//     productList,
//     isPending: isOrderPending || isProductPending || !order,
//   };
// };
