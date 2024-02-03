import { ColumnDef } from "@tanstack/react-table";

export interface ITableDataProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: string;
  isLoading: boolean;
}
