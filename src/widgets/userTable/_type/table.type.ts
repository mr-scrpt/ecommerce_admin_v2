export type UserColumnType = {
  id: string;
  role: string;
  name: string | null | undefined;
  // slug: string;
  createdAt: string;
};

export interface IUserTableItem {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}
