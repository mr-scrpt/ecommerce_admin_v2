export type ProductUpdateComplexible = {
  productId: string;
  productData: Partial<ProductToUpdate>;
  categoryListId: Array<{ id: string }>;
  propertyItemListSelected: Array<{ id: string }>;
  // propertyItemListSelected;
  // categoryList;
};
