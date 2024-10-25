import { CategoryUniqueByNameInvariant } from "@/kernel/domain/category/invariant.type";
import { PropertyExistByListIdInvariant } from "@/kernel/domain/property/invariant.type";

type CategoryUniqueByNameInvariantWithRequiredSelector =
  CategoryUniqueByNameInvariant &
    Required<Pick<CategoryUniqueByNameInvariant, "selector">>;

export interface ICategoryUpdateInvariant {
  categoryUniqueInvariant: CategoryUniqueByNameInvariantWithRequiredSelector;
  propertExistByListIdInvariant: PropertyExistByListIdInvariant;
}
