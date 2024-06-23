import { Category } from "@/kernel/domain/category/category.type";
import {
  PropertyComposite,
  PropertyCompositeEntity,
  PropertyDataTypeEnum,
} from "@/kernel/domain/property/property.type";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";

// NOTE: Relations
export type PropertyRelationEntity = PropertyCompositeEntity & {
  categoryList: Array<Category>;
};

export type PropertyRelation = PropertyComposite & {
  categoryList: Array<Category>;
};

// NOTE: Selector
export type PropertyGetSelector = {
  id: string;
};

export type PropertyListGetByCategoryListSelector = {
  categoryIdList: Array<{ categoryId: string }>;
};

// UI
export type PropertyToSelect = {
  id: string;
  name: string;
  datatype: PropertyDataTypeEnum;
  // propertyList: Array<MultiSelectPropertyItem & { active: boolean }>;
  propertyList: Array<MultiSelectOptionItem>;
};
