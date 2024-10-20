import { CategoryUniqueByNameInvariant } from "@/kernel/domain/category/invariant.type";
import { PropertyExistByListIdInvariant } from "@/kernel/domain/property/invariant.type";

export interface ICategoryUpdateInvariant {
  categoryUniqueInvariant: CategoryUniqueByNameInvariant;
  propertExistByListIdInvariant: PropertyExistByListIdInvariant;
}
