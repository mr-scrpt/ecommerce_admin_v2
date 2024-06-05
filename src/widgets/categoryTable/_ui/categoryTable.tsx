"use client";

import { useCategoryRemoveConfirm } from "@/features/categoryRemove";
import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useCategoryTableList } from "../_vm/useCategoryTableList";
import { useTableColumns } from "../_vm/useTabelColumns";
import { Button } from "@/shared/ui/button";
import { cartRowAddApi } from "@/features/cartRowAdd/server";

interface CategoryTableProps extends HTMLAttributes<HTMLDivElement> {}

export const CategoryTable: FC<CategoryTableProps> = (props) => {
  const { mutateAsync } = cartRowAddApi.cartRowAdd.add.useMutation();
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
    isPendingCategoryList || !isFetchedAfterMount || isPendingRemoveCategory;

  const categoryColumns = useTableColumns({
    onDeleteClick,
  });

  if (isPendingComplexible) {
    return <Spinner aria-label="Category loaded..." />;
  }

  return (
    <>
      <Button
        onClick={() =>
          mutateAsync({
            selector: {
              productId: "prod_2",
            },
          })
        }
      >
        Fetch
      </Button>
      <TableData
        columns={categoryColumns}
        data={categoryList}
        filterKey="name"
        isLoading={isPendingComplexible}
      />
    </>
  );
};
