export type OrderColumnType = {
  id: string;
  orderNo: string;
  orderStateStatus: string;
  orderPaymentStatus: string;
  // name: string | null | undefined;
  // slug: string;
  createdAt: string;
};

export interface IOrderTableItem {
  id: string;
  orderNo: string;
  name: string;
  // slug: string;
  createdAt: string;
}
