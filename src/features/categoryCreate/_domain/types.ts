import { CategoryCreateDTO } from "@/entities/category";

export type CategoryCreateTxPayload = {
  name: string;
  board: Array<string>;
  propertyList: Array<{ id: string }>;
};

export type CategoryCreateTxDTO = {
  categoryData: CategoryCreateDTO;
  propertyData: Array<{ id: string }>;
};
