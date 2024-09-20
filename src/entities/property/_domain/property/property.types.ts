import { Category } from "@/kernel/domain/category/category.type";
import { PropertyDefaultSelectOption } from "@/kernel/domain/property/form.schema";
import {
  PROPERTY_DATATYPE,
  PropertyComposite,
  PropertyCompositeEntity,
} from "@/kernel/domain/property/property.type";
import { PropertyItem } from "@/kernel/domain/property/propertyItem.type";

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

// NOTE: UI
// TODO: NEEDED?
// export type PropertyToSelect = {
//   id: string;
//   name: string;
//   datatype: PROPERTY_DATATYPE;
//   // propertyList: Array<MultiSelectPropertyItem & { active: boolean }>;
//   propertyList: Array<PropertyDefaultSelectOption>;
// };
