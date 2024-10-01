import { Spinner } from "@/shared/ui/icons/spinner";
import { ComponentProps, ComponentType } from "react";

import { OrderRelation } from "../_domain/order/order.types";
import { OrderPresentation } from "../_ui/order/presentation/orderPresentation";

type OrderPresentationProps = ComponentProps<typeof OrderPresentation>;

type WithOrderPresentationProps = {
  order: OrderRelation | null;
  isSuccess: boolean;
  isAppearancePending: boolean;
  isFetchedAfterMount: boolean;
};

export const withOrderPresentation = <P extends object>(
  WrappedComponent: ComponentType<OrderPresentationProps>,
  usePresentationHook: (props: P) => WithOrderPresentationProps,
) => {
  return function WithOrderPresentation(
    props: P & Partial<OrderPresentationProps>,
  ) {
    const {
      order: order,
      isSuccess,
      isAppearancePending,
      isFetchedAfterMount,
    } = usePresentationHook(props);

    if (!order) return null;
    if (isAppearancePending) return <Spinner />;

    return (
      <WrappedComponent
        {...props}
        order={order}
        isSuccess={isSuccess}
        isPending={isAppearancePending}
        isFetchedAfterMount={isFetchedAfterMount}
      />
    );
  };
};
