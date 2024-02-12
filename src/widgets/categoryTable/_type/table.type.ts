export type CategoryColumnType = {
  id: string;
  name: string | null | undefined;
  createdAt: string;
};

export interface ICategoryTableItem {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}
