"use client";
import { Spinner } from "@/shared/ui/icons/spinner";
import { FC, HTMLAttributes } from "react";
import {
  ConsumerPresentationProps,
  consumerDataInjector,
} from "../../_hoc/withConsumerData.hoc";
import { ConsumerContext, useConsumerData } from "../../_vm/consumer.provider";
import { useConsumerRelationByOrderModel } from "../../_vm/useConsumerRelationByOrder.model";
import { ConsumerTable } from "./elements/consumerTable";
import { cn } from "@/shared/ui/utils";

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

const List: FC<HTMLAttributes<HTMLUListElement>> = (props) => {
  const { className } = props;
  const consumer = useConsumerData();
  const consumerList = Array.isArray(consumer)
    ? consumer
    : consumer
      ? [consumer]
      : [];
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {consumerList.map((consumer) => (
        <li key={consumer.id} className="text-sm">
          {consumer.name}
        </li>
      ))}
    </ul>
  );
};

const DataByOrder = consumerDataInjector<{ orderId: string }>(({ orderId }) =>
  useConsumerRelationByOrderModel(orderId),
)(ConsumerPresentationBase);

export const ConsumerPresentation = Object.assign(ConsumerPresentationBase, {
  Tabel,
  List,
  DataByOrder,
});
