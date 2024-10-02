import { Spinner } from "@/shared/ui/icons/spinner";
import { ComponentType, HTMLAttributes, ReactNode } from "react";
import { ConsumerRelation } from "../_domain/consumer.type";

export interface WithConsumerDataListProps {
  consumerList: Array<ConsumerRelation>;
  isSuccessConsumer: boolean;
  isAppearancePendingConsumer: boolean;
  isFetchedAfterMountConsumer: boolean;
  isErrorConsumer: boolean;
}

export interface ConsumerListPresentationProps
  extends HTMLAttributes<HTMLDivElement> {
  consumerList: Array<ConsumerRelation>;
  isPending: boolean;
  isSuccess: boolean;
  isFetchedAfterMount: boolean;
  isError: boolean;
}

export const consumerDataListInjector = <P extends object>(
  useDataHook: (props: P) => WithConsumerDataListProps,
) => {
  return function HOC(
    WrappedComponent: ComponentType<ConsumerListPresentationProps>,
  ) {
    return function WithConsumerData(props: P & { children?: ReactNode }) {
      const { children, ...restProps } = props;
      const {
        consumerList,
        isSuccessConsumer,
        isAppearancePendingConsumer,
        isFetchedAfterMountConsumer,
        isErrorConsumer,
      } = useDataHook(restProps as P);

      if (isAppearancePendingConsumer) return <Spinner />;

      return (
        <WrappedComponent
          {...restProps}
          consumerList={consumerList}
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
// export const withConsumerListPresentation = <P extends object>(
//   WrappedComponent: ComponentType<ConsumerListPresentationProps>,
//   useDataHook: (props: P) => WithConsumerListDataProps,
// ) => {
//   return function WithConsumerPresentation(
//     props: P & Partial<ConsumerListPresentationProps>,
//   ) {
//     const {
//       consumerList,
//       isSuccess,
//       isAppearancePending,
//       isFetchedAfterMount,
//     } = useDataHook(props);
//
//     if (isAppearancePending) return <Spinner />;
//
//     return (
//       <WrappedComponent
//         {...props}
//         consumerList={consumerList}
//         isSuccess={isSuccess}
//         isPending={isAppearancePending}
//         isFetchedAfterMount={isFetchedAfterMount}
//       />
//     );
//   };
// };
