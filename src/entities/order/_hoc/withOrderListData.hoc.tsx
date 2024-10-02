import { Spinner } from "@/shared/ui/icons/spinner";
import { ComponentType, HTMLAttributes, ReactNode } from "react";

import { OrderRelation } from "../_domain/order/order.types";

export interface WithOrderDataListProps {
  orderList: Array<OrderRelation>;
  isSuccessOrder: boolean;
  isAppearancePendingOrder: boolean;
  isFetchedAfterMountOrder: boolean;
  isErrorOrder: boolean;
}

export interface OrderListPresentationProps
  extends HTMLAttributes<HTMLDivElement> {
  orderList: Array<OrderRelation>;
  isPending: boolean;
  isSuccess: boolean;
  isFetchedAfterMount: boolean;
  isError: boolean;
}

export const orderDataListInjector = <P extends object>(
  useDataHook: (props: P) => WithOrderDataListProps,
) => {
  return function HOC(
    WrappedComponent: ComponentType<OrderListPresentationProps>,
  ) {
    return function WithOrderData(props: P & { children?: ReactNode }) {
      const { children, ...restProps } = props;
      const {
        orderList,
        isSuccessOrder,
        isAppearancePendingOrder,
        isFetchedAfterMountOrder,
        isErrorOrder,
      } = useDataHook(restProps as P);

      if (isAppearancePendingOrder) return <Spinner />;

      return (
        <WrappedComponent
          {...restProps}
          orderList={orderList}
          isSuccess={isSuccessOrder}
          isPending={isAppearancePendingOrder}
          isFetchedAfterMount={isFetchedAfterMountOrder}
          isError={isErrorOrder}
        >
          {children}
        </WrappedComponent>
      );
    };
  };
};
