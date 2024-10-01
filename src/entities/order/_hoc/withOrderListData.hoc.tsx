import { Spinner } from "@/shared/ui/icons/spinner";
import React, { ComponentProps, ComponentType } from "react";

import { OrderListPresentation } from "../_ui/order/presentation/orderListPresentation";
import { OrderRelation } from "../_domain/order/order.types";
import { useOrderListWithRelationByOrderModel } from "../_vm/order/useOrderListWithRelationByOrder.model";

type OrderListPresentationProps = ComponentProps<typeof OrderListPresentation>;

type WithOrderDataProps = {
  orderList: OrderRelation[];
  isSuccess: boolean;
  isAppearancePending: boolean;
  isFetchedAfterMount: boolean;
};

export const withOrderListData = <P extends object>(
  WrappedComponent: ComponentType<OrderListPresentationProps>,
  useDataHook: (props: P) => WithOrderDataProps,
) => {
  return function WithOrderData(
    props: P & Partial<OrderListPresentationProps>,
  ) {
    const { orderList, isSuccess, isAppearancePending, isFetchedAfterMount } =
      useDataHook(props);

    if (isAppearancePending) return <Spinner />;

    return (
      <WrappedComponent
        {...props}
        orderList={orderList}
        isSuccess={isSuccess}
        isPending={isAppearancePending}
        isFetchedAfterMount={isFetchedAfterMount}
      />
    );
  };
};

export const OrderListProvideByOrder = withOrderListData<{
  orderId: string;
}>(OrderListPresentation, ({ orderId }) =>
  useOrderListWithRelationByOrderModel(orderId),
);
