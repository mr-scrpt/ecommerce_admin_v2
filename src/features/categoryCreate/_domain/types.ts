import { CategoryBase } from "@/entities/category";
import { Property } from "@/entities/property";

type PropertyList = Array<{ propertyId: Property["id"] }>;
type CategoryCreate = Omit<CategoryBase, "slug">;

export type CategoryCreateTxPayload = {
  categoryData: CategoryCreate;
  propertyData: PropertyList;
};

export type CategoryCreateTxDTO = {
  categoryData: CategoryCreate & { slug: string };
  propertyData: PropertyList;
};
