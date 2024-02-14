export type ProductColumnType = {
  id: string;
  name: string | null | undefined;
  // slug: string;
  createdAt: string;
};

export interface IProductTableItem {
  id: string;
  name: string;
  // slug: string;
  createdAt: string;
}
