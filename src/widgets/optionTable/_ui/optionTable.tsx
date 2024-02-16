"use client";

// import { Spinner } from "@/shared/ui/icons/spinner";
// import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useOptionTableList } from "../_vm/useOptionTableList";
// import { useOptionTableList } from "../_vm/useOptionTableList";
// import { useTableColumns } from "../_vm/useTabelColumns";
// import { useOptionRemoveConfirm } from "../_vm/useOptionRemoveConfirm";

interface OptionTableProps extends HTMLAttributes<HTMLDivElement> {}

export const OptionTable: FC<OptionTableProps> = (props) => {
  const {
    optionList,
    isPending: isPendingOptionList,
    isFetchedAfterMount,
  } = useOptionTableList();
  console.log("output_log: optionLIst =>>>", optionList);

  // const {
  //   removeOptionConfirm: onDeleteClick,
  //   isPending: isPendingRemoveOption,
  // } = useOptionRemoveConfirm();
  //
  // const isPendingComplexible =
  //   isPendingOptionList || isPendingRemoveOption || !isFetchedAfterMount;
  // const optionColumns = useTableColumns({
  //   onDeleteClick,
  // });
  //
  // if (isPendingComplexible) {
  //   return <Spinner aria-label="Option loaded..." />;
  // }

  // return (
  //   <TableData
  //     columns={optionColumns}
  //     data={optionList}
  //     filterKey="name"
  //     isLoading={isPendingComplexible}
  //   />
  // );
  return "table";
};
