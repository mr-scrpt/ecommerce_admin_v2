import { CategoryUpdateDTO } from "@/kernel/domain/category/category.dto";
import { Category } from "@/kernel/domain/category/category.type";
import { Property } from "@/kernel/domain/property/property.type";

type CategoryUpdatePayload = Partial<Category>;
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
