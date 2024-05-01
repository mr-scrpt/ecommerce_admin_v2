export type StoreColumnType = {
  id: string;
  name: string;
  settlement: string | null | undefined;
  createdAt: string;
};

export interface IStoreTableItem {
  id: string;
  name: string;
  settlement: string;
  createdAt: string;
}
