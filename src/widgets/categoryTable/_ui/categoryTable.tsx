"use client";
import { useAppSessionOrRedirect } from "@/entities/user/_vm/useAppSession";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useCategoryTableList } from "../_vm/useCategoryTableList";
import { useTableColumns } from "../_vm/useTabelColumns";
import { useCategoryRemoveConfirm } from "../_vm/useCategoryRemoveConfirm";
// import { useCategoryRemoveConfirm } from "../_vm/useCategoryRemoveConfirm";
// import { useCategoryUpdateModal } from "../_vm/useCategoryUpdateModal";

interface CategoryTableProps extends HTMLAttributes<HTMLDivElement> {}

export const CategoryTable: FC<CategoryTableProps> = (props) => {
  const session = useAppSessionOrRedirect();

  const { categoryList, isPending: isPendingCategoryList } =
    useCategoryTableList(session!.user.id);

  const {
    removeCategoryConfirm: onDeleteClick,
    isPending: isPendingRemoveCategory,
  } = useCategoryRemoveConfirm();

  // const { openUpdateModal: onUpdateClick } = useCategoryUpdateModal();

  // const isPendingComplexible = isPendingCategoryList || isPendingRemoveCategory;
  const categoryColumns = useTableColumns({
    onDeleteClick,
    onUpdateClick: () => {},
  });

  // if (isPendingComplexible) {
  //   return <Spinner aria-label="Profile loade..." />;
  // }
  return (
    <TableData
      columns={categoryColumns}
      data={categoryList}
      filterKey="name"
      isLoading={false}
    />
  );
};
