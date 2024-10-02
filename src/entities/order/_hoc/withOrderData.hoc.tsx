import { Spinner } from "@/shared/ui/icons/spinner";
import { ComponentType, HTMLAttributes, ReactNode } from "react";

import { OrderRelation } from "../_domain/order/order.types";

export interface WithOrderDataProps {
  order: OrderRelation | null;
  isSuccessOrder: boolean;
  isAppearancePendingOrder: boolean;
  isFetchedAfterMountOrder: boolean;
  isErrorOrder: boolean;
}

export interface OrderPresentationProps extends HTMLAttributes<HTMLDivElement> {
  order: OrderRelation;
  isPending: boolean;
  isSuccess: boolean;
  isFetchedAfterMount: boolean;
  isError: boolean;
}

export const orderDataInjector = <P extends object>(
  useDataHook: (props: P) => WithOrderDataProps,
) => {
  return function HOC(WrappedComponent: ComponentType<OrderPresentationProps>) {
    return function WithOrderData(props: P & { children?: ReactNode }) {
      const { children, ...restProps } = props;
      const {
        order,
        isSuccessOrder,
        isAppearancePendingOrder,
        isFetchedAfterMountOrder,
        isErrorOrder,
      } = useDataHook(restProps as P);

      if (!order) return null;
      if (isAppearancePendingOrder) return <Spinner />;

      return (
        <WrappedComponent
          {...restProps}
          order={order}
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
