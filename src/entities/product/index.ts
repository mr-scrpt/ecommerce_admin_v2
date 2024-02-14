export { ProductForm } from "./_ui/productForm";
export { productFormSchema, productSchema } from "./_domain/product.schema";
export {
  useProductListQuery,
  useProductQuery,
  useProductBySlugQuery,
} from "./_query/product.query";
export {
  ProductRepository,
  productRepository,
} from "./_repository/product.repo";
export { createProductAbility } from "./_domain/product.ability";

export type { ProductId, ProductEntity } from "./_domain/types";
