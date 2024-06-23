export { useProductQuery } from "./_query/product.query";
export { useProductListQuery } from "./_query/productList.query";
export { useProductListSearchQuery } from "./_query/productListSearch.query";
export { useProductWithRelationQuery } from "./_query/productWithRelation.query";
export { ProductSelect } from "./_ui/fromField/productSelect";
export { ProductFormLayout } from "./_ui/productFormLayout";

export { useProductListToSelectModel } from "./_vm/useProductListToSelect.model";

export type {
  ProductPropertyItem,
  ProductPropertyObjectList,
  ProductRelation,
  ProductToSelect,
  ProductToSelectGroup,
} from "./_domain/product.types";

export type {
  ProductCreateDTO,
  ProductRemoveDTO,
  ProductUpdateDTO,
} from "./_domain/product.dto";
