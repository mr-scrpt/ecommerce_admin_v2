import { Category } from "@/kernel/domain/category/category.type";
import {
  PropertyComposite,
  PropertyCompositeEntity,
  PropertyDataTypeEnum,
} from "@/kernel/domain/property/property.type";
import { PropertyItem } from "@/kernel/domain/property/propertyItem.type";
import { SelectOptionItem } from "@/shared/type/select";

// NOTE: Relations
export type PropertyRelationEntity = PropertyCompositeEntity & {
  categoryList: Array<Category>;
};

export type PropertyRelation = PropertyComposite & {
  categoryList: Array<Category>;
  propertyList: Array<PropertyItem>;
};

// NOTE: Selector
export type PropertyGetSelector = {
  id: string;
};

export type PropertyGetByCategorySelector = {
  categoryId: string;
};

export type PropertyGetByCategoryListSelector = {
  categoryIdList: Array<{ categoryId: string }>;
};

// UI
export type PropertyToSelect = {
  id: string;
  name: string;
  datatype: PropertyDataTypeEnum;
  // propertyList: Array<MultiSelectPropertyItem & { active: boolean }>;
  propertyList: Array<SelectOptionItem>;
};
