export { ProductForm } from "./_ui/productForm";
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
} from "./_domain/types";
