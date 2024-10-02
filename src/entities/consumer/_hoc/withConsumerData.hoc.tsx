import { Spinner } from "@/shared/ui/icons/spinner";
import React, { ComponentType, HTMLAttributes, ReactNode } from "react";
import { ConsumerRelation } from "../_domain/consumer.type";

export interface WithConsumerDataProps {
  consumer: ConsumerRelation | null;
  isSuccess: boolean;
  isAppearancePending: boolean;
  isFetchedAfterMount: boolean;
}

export interface ConsumerPresentationProps
  extends HTMLAttributes<HTMLDivElement> {
  consumer: ConsumerRelation;
  isPending: boolean;
  isSuccess: boolean;
  isFetchedAfterMount: boolean;
}

export const consumerDataInject = <P extends object>(
  useDataHook: (props: P) => WithConsumerDataProps,
) => {
  return function HOC(
    WrappedComponent: ComponentType<ConsumerPresentationProps>,
  ) {
    return function WithConsumerData(props: P & { children?: ReactNode }) {
      const { children, ...restProps } = props;
      const { consumer, isSuccess, isAppearancePending, isFetchedAfterMount } =
        useDataHook(restProps as P);

      if (!consumer) return null;
      if (isAppearancePending) return <Spinner />;

      return (
        <WrappedComponent
          {...restProps}
          consumer={consumer}
          isSuccess={isSuccess}
          isPending={isAppearancePending}
          isFetchedAfterMount={isFetchedAfterMount}
        >
          {children}
        </WrappedComponent>
      );
    };
  };
};
