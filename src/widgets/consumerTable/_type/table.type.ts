export type ConsumerColumnType = {
  id: string;
  // role: string;
  name: string | null | undefined;
  // slug: string;
  createdAt: string;
};

export interface IConsumerTableItem {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}
