import { CategoryBase } from "@/entities/category";
import { Property } from "@/entities/property";

type PropertyList = Array<{ propertyId: Property["id"] }>;
type CategoryUpdate = Partial<CategoryBase>;

export type CategoryUpdateTxPayload = {
  selector: CategoryUpdateSelector;
  categoryData: CategoryUpdate;
  propertyData: PropertyList;
};

export type CategoryUpdateTxDTO = {
  selector: CategoryUpdateSelector;
  categoryData: CategoryUpdate;
  propertyData: PropertyList;
};

// NOTE: Selector
export type CategoryUpdateSelector = {
  id: string;
};
