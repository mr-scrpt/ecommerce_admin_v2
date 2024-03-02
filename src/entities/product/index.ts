export { ProductFormLayout } from "./_ui/productFormLayout";
export {
  productFormSchema,
  productSchema,
  productCreateSchema,
  productUpdateSchema,
} from "./_domain/product.schema";
export { useProductQuery } from "./_query/product.query";
export { useProductWithRelationQuery } from "./_query/productWithRelation.query";
export { useProductListQuery } from "./_query/productList.query";
export { createProductAbility } from "./_domain/product.ability";

export type {
  Product,
  ProductId,
  ProductEntity,
  ProductRelation,
  ProductToCreate,
  ProductToUpdate,
  ProductPropertyItem,
  ProductPropertyObjectList,
} from "./_domain/types";
