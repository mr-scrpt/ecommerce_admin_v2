import { Spinner } from "@/shared/ui/icons/spinner";
import React, { ComponentType, HTMLAttributes, ReactNode } from "react";
import { ConsumerRelation } from "../_domain/consumer.type";

export interface WithConsumerDataProps {
  consumer: ConsumerRelation | null;
  isSuccessConsumer: boolean;
  isAppearancePendingConsumer: boolean;
  isFetchedAfterMountConsumer: boolean;
  isErrorConsumer: boolean;
}

export interface ConsumerPresentationProps
  extends HTMLAttributes<HTMLDivElement> {
  consumer: ConsumerRelation;
  isPending: boolean;
  isSuccess: boolean;
  isFetchedAfterMount: boolean;
  isError: boolean;
}

export const consumerDataInjector = <P extends object>(
  useDataHook: (props: P) => WithConsumerDataProps,
) => {
  return function HOC(
    WrappedComponent: ComponentType<ConsumerPresentationProps>,
  ) {
    return function WithConsumerData(props: P & { children?: ReactNode }) {
      const { children, ...restProps } = props;
      const {
        consumer,
        isSuccessConsumer,
        isAppearancePendingConsumer,
        isFetchedAfterMountConsumer,
        isErrorConsumer,
      } = useDataHook(restProps as P);

      if (!consumer) return null;
      if (isAppearancePendingConsumer) return <Spinner />;

      return (
        <WrappedComponent
          {...restProps}
          consumer={consumer}
          isSuccess={isSuccessConsumer}
          isPending={isAppearancePendingConsumer}
          isFetchedAfterMount={isFetchedAfterMountConsumer}
          isError={isErrorConsumer}
        >
          {children}
        </WrappedComponent>
      );
    };
  };
};
