export type OrderColumnType = {
  id: string;
  name: string | null | undefined;
  // slug: string;
  createdAt: string;
};

export interface IOrderTableItem {
  id: string;
  name: string;
  // slug: string;
  createdAt: string;
}
