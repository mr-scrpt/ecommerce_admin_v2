"use client";
import { Spinner } from "@/shared/ui/icons/spinner";
import { FC, HTMLAttributes } from "react";
import { ConsumerRelation } from "../../_domain/consumer.type";
import { ConsumerContext, useConsumerData } from "../../_vm/consumer.provider";
import { ConsumerTable } from "./elements/consumerTable";

interface ConsumerPresentation extends HTMLAttributes<HTMLDivElement> {
  consumer: ConsumerRelation;
  isPending: boolean;
  isSuccess: boolean;
  isFetchedAfterMount: boolean;
}

type ConsumerPresentationType = FC<ConsumerPresentation> & {
  Tabel: FC<HTMLAttributes<HTMLTableElement>>;
};

export const ConsumerPresentation: ConsumerPresentationType = (props) => {
  const { children, consumer, isPending, isSuccess, isFetchedAfterMount } =
    props;

  if (isPending) return <Spinner />;

  return (
    <ConsumerContext.Provider value={consumer}>
      {children}
    </ConsumerContext.Provider>
  );
};

ConsumerPresentation.Tabel = function ConsumerPresentation(props) {
  const { className } = props;

  const consumer = useConsumerData();

  const consumerList = Array.isArray(consumer)
    ? consumer
    : consumer
      ? [consumer]
      : [];

  return <ConsumerTable consumerList={consumerList} className={className} />;
};
