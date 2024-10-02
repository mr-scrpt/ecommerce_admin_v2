"use client";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import {
  ConsumerListPresentationProps,
  consumerDataListInjector,
} from "../../_hoc/withConsumerListData.hoc";
import {
  ConsumerListContext,
  useConsumerListData,
} from "../../_vm/consumer.provider";
import { useConsumerRelationListModel } from "../../_vm/useConsumerRelationList.model";
import { ConsumerTable } from "./elements/consumerTable";

const ConsumerListPresentationBase: FC<ConsumerListPresentationProps> = (
  props,
) => {
  const { children, consumerList, isPending } = props;

  if (isPending) return <Spinner />;

  return (
    <ConsumerListContext.Provider value={consumerList}>
      {children}
    </ConsumerListContext.Provider>
  );
};

const Tabel: FC<HTMLAttributes<HTMLTableElement>> = (props) => {
  const { className } = props;

  const consumerList = useConsumerListData();

  return <ConsumerTable consumerList={consumerList} className={className} />;
};

const List: FC<HTMLAttributes<HTMLUListElement>> = (props) => {
  const { className } = props;
  const consumerList = useConsumerListData();
  return (
    <ul className={cn("flex list-inside list-disc flex-col gap-2", className)}>
      {consumerList.map((consumer) => (
        <li key={consumer.id} className="text-sm">
          {consumer.name}
        </li>
      ))}
    </ul>
  );
};

const DataList = consumerDataListInjector(useConsumerRelationListModel)(
  ConsumerListPresentationBase,
);

export const ConsumerListPresentation = Object.assign(
  ConsumerListPresentationBase,
  { DataList, Tabel, List },
);
