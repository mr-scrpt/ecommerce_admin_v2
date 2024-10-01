"use client";
import { Spinner } from "@/shared/ui/icons/spinner";
import { FC, HTMLAttributes } from "react";
import { ConsumerRelation } from "../../_domain/consumer.type";
import {
  ConsumerListContext,
  useConsumerListData,
} from "../../_vm/consumer.provider";
import { ConsumerTable } from "./elements/consumerTable";

interface ConsumerListPresentation extends HTMLAttributes<HTMLDivElement> {
  consumerList: Array<ConsumerRelation>;
  isPending: boolean;
  isSuccess: boolean;
  isFetchedAfterMount: boolean;
}

type ConsumerListPresentationType = FC<ConsumerListPresentation> & {
  Tabel: FC<HTMLAttributes<HTMLTableElement>>;
};

export const ConsumerListPresentation: ConsumerListPresentationType = (
  props,
) => {
  const { children, consumerList, isPending, isSuccess, isFetchedAfterMount } =
    props;

  if (isPending) return <Spinner />;

  return (
    <ConsumerListContext.Provider value={consumerList}>
      {children}
    </ConsumerListContext.Provider>
  );
};

ConsumerListPresentation.Tabel = function ConsumerPresentation(props) {
  const { className } = props;

  const consumerList = useConsumerListData();

  return <ConsumerTable consumerList={consumerList} className={className} />;
};
