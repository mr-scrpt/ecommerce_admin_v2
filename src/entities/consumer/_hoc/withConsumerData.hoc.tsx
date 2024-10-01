import { Spinner } from "@/shared/ui/icons/spinner";
import React, { ComponentProps, ComponentType } from "react";
import { ConsumerRelation } from "../_domain/consumer.type";
import { useConsumerRelationByOrderModel } from "../_vm/useConsumerRelationByOrder.model";

import { ConsumerPresentation } from "../_ui/presentation/consumerPresentation";

type ConsumerDataProps = ComponentProps<typeof ConsumerPresentation>;

type WithConsumerDataProps = {
  consumer: ConsumerRelation | null;
  isSuccess: boolean;
  isAppearancePending: boolean;
  isFetchedAfterMount: boolean;
};

export const withConsumerData = <P extends object>(
  WrappedComponent: ComponentType<ConsumerDataProps>,
  useDataHook: (props: P) => WithConsumerDataProps,
) => {
  return function WithConsumerData(props: P & Partial<ConsumerDataProps>) {
    const { consumer, isSuccess, isAppearancePending, isFetchedAfterMount } =
      useDataHook(props);

    if (!consumer) return null;
    if (isAppearancePending) return <Spinner />;

    return (
      <WrappedComponent
        {...props}
        consumer={consumer}
        isSuccess={isSuccess}
        isPending={isAppearancePending}
        isFetchedAfterMount={isFetchedAfterMount}
      />
    );
  };
};

export const ConsumerProvideByOrder = withConsumerData<{
  orderId: string;
}>(ConsumerPresentation, ({ orderId }) =>
  useConsumerRelationByOrderModel(orderId),
);
