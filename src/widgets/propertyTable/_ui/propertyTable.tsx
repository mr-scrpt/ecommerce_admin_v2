"use client";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { usePropertyTableList } from "../_vm/usePropertyTableList";
import { useTableColumns } from "../_vm/useTabelColumns";
import { usePropertyRemoveConfirm } from "@/features/propertyRemove";

interface PropertyTableProps extends HTMLAttributes<HTMLDivElement> {}

export const PropertyTable: FC<PropertyTableProps> = (props) => {
  const {
    propertyList,
    isPending: isPendingPropertyList,
    isFetchedAfterMount,
  } = usePropertyTableList();

  const {
    removePropertyConfirm: onDeleteClick,
    isPending: isPendingRemoveProperty,
  } = usePropertyRemoveConfirm();

  const isPendingComplexible =
    isPendingPropertyList || isPendingRemoveProperty || !isFetchedAfterMount;

  const propertyColumns = useTableColumns({
    onDeleteClick,
  });

  if (isPendingComplexible) {
    return <Spinner aria-label="Property loaded..." />;
  }

  return (
    <TableData
      columns={propertyColumns}
      data={propertyList}
      filterKey="name"
      isLoading={isPendingComplexible}
    />
  );
};
