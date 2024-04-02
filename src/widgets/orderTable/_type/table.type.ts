export type OrderColumnType = {
  id: string;
  orderNo: number;
  name: string | null | undefined;
  // slug: string;
  createdAt: string;
};

export interface IOrderTableItem {
  id: string;
  orderNo: number;
  name: string;
  // slug: string;
  createdAt: string;
}
