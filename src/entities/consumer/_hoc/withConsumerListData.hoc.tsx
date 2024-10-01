import { Spinner } from "@/shared/ui/icons/spinner";
import React, { ComponentProps, ComponentType } from "react";
import { ConsumerRelation } from "../_domain/consumer.type";

import { ConsumerListPresentation } from "../_ui/presentation/consumerListPresentation";

type ConsumerListPresentationProps = ComponentProps<
  typeof ConsumerListPresentation
>;

type WithConsumerListDataProps = {
  consumerList: ConsumerRelation[];
  isSuccess: boolean;
  isAppearancePending: boolean;
  isFetchedAfterMount: boolean;
};

export const withConsumerListPresentation = <P extends object>(
  WrappedComponent: ComponentType<ConsumerListPresentationProps>,
  useDataHook: (props: P) => WithConsumerListDataProps,
) => {
  return function WithConsumerPresentation(
    props: P & Partial<ConsumerListPresentationProps>,
  ) {
    const {
      consumerList,
      isSuccess,
      isAppearancePending,
      isFetchedAfterMount,
    } = useDataHook(props);

    if (isAppearancePending) return <Spinner />;

    return (
      <WrappedComponent
        {...props}
        consumerList={consumerList}
        isSuccess={isSuccess}
        isPending={isAppearancePending}
        isFetchedAfterMount={isFetchedAfterMount}
      />
    );
  };
};
