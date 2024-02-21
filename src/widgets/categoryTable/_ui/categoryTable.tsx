"use client";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useCategoryTableList } from "../_vm/useCategoryTableList";
import { useTableColumns } from "../_vm/useTabelColumns";
import { useCategoryRemoveConfirm } from "../_vm/useCategoryRemoveConfirm";

interface CategoryTableProps extends HTMLAttributes<HTMLDivElement> {}

export const CategoryTable: FC<CategoryTableProps> = (props) => {
  const {
    categoryList,
    isPending: isPendingCategoryList,
    isFetchedAfterMount,
  } = useCategoryTableList();

  const {
    removeCategoryConfirm: onDeleteClick,
    isPending: isPendingRemoveCategory,
  } = useCategoryRemoveConfirm();

  const isPendingComplexible =
    isPendingCategoryList || isPendingRemoveCategory || !isFetchedAfterMount;

  const categoryColumns = useTableColumns({
    onDeleteClick,
  });

  if (isPendingComplexible) {
    return <Spinner aria-label="Category loaded..." />;
  }

  return (
    <TableData
      columns={categoryColumns}
      data={categoryList}
      filterKey="name"
      isLoading={isPendingComplexible}
    />
  );
};
