"use client";
import { Spinner } from "@/shared/ui/icons/spinner";
import { FC, HTMLAttributes } from "react";
import {
  ConsumerPresentationProps,
  consumerDataInject,
} from "../../_hoc/withConsumerData.hoc";
import { ConsumerContext, useConsumerData } from "../../_vm/consumer.provider";
import { useConsumerRelationByOrderModel } from "../../_vm/useConsumerRelationByOrder.model";
import { ConsumerTable } from "./elements/consumerTable";

const ConsumerPresentationBase: FC<ConsumerPresentationProps> = (props) => {
  const { children, consumer, isPending } = props;

  if (isPending) return <Spinner />;

  return (
    <ConsumerContext.Provider value={consumer}>
      {children}
    </ConsumerContext.Provider>
  );
};

const Tabel: FC<HTMLAttributes<HTMLTableElement>> = (props) => {
  const { className } = props;
  const consumer = useConsumerData();
  const consumerList = Array.isArray(consumer)
    ? consumer
    : consumer
      ? [consumer]
      : [];
  return <ConsumerTable consumerList={consumerList} className={className} />;
};

const DataByOrder = consumerDataInject<{ orderId: string }>(({ orderId }) =>
  useConsumerRelationByOrderModel(orderId),
)(ConsumerPresentationBase);

export const ConsumerPresentation = Object.assign(ConsumerPresentationBase, {
  Tabel,
  DataByOrder,
});
