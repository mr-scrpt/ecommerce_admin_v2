import { CategoryUpdateDTO } from "@/entities/category";

export type CategoryUpdateTxPayload = {
  id: string;
  name: string;
  board: Array<string>;
  propertyList: Array<{ id: string }>;
};

export type CategoryUpdateTxDTO = {
  categoryData: CategoryUpdateDTO;
  propertyData: Array<{ id: string }>;
};
