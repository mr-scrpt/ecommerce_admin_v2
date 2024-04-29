export type StoreColumnType = {
  id: string;
  settlement: string | null | undefined;
  createdAt: string;
};

export interface IStoreTableItem {
  id: string;
  settlement: string;
  // slug: string;
  createdAt: string;
}
