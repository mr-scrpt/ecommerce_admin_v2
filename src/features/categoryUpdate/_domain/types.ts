import { CategoryBase, CategoryUpdateDTO } from "@/entities/category";
import { Property } from "@/entities/property";

type CategoryUpdatePayload = Partial<CategoryBase>;
type PropertyList = Array<{ propertyId: Property["id"] }>;

export type CategoryUpdateTxPayload = {
  selector: CategoryUpdateSelector;
  categoryData: CategoryUpdatePayload;
  propertyData: PropertyList;
};

export type CategoryUpdateTxDTO = {
  selector: CategoryUpdateSelector;
  categoryData: CategoryUpdateDTO["data"];
  propertyData: PropertyList;
};

// NOTE: Selector
export type CategoryUpdateSelector = {
  id: string;
};
