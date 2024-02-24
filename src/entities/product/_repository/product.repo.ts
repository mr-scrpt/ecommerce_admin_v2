import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  ProductAddCategoryList,
  ProductEntity,
  ProductId,
  ProductRelationEntity,
  ProductToCreate,
  ProductToUpdate,
} from "../_domain/types";

export class ProductRepository {
  constructor(readonly db: DbClient) {}

  async getProduct(
    productId: ProductId,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    return db.product.findUniqueOrThrow({
      where: {
        id: productId,
      },
    });
  }

  async getProductWithRelation(
    productId: ProductId,
    db: Tx = this.db,
  ): Promise<ProductRelationEntity> {
    return db.product.findUniqueOrThrow({
      where: {
        id: productId,
      },
      include: {
        categoryList: true,
        optionItemListSelected: true,
      },
    });
  }

  async getProductBySlug(
    slug: string,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    return db.product.findUniqueOrThrow({
      where: {
        slug,
      },
    });
  }

  async getProductList(db: Tx = this.db): Promise<ProductEntity[]> {
    return db.product.findMany();
  }

  async createProduct(
    product: ProductToCreate,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    return await db.product.create({
      data: product,
    });
  }

  async addCategoryList(
    data: ProductAddCategoryList,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    const { productId, categoryListId } = data;
    return await db.product.update({
      where: {
        id: productId,
      },
      data: {
        categoryList: {
          connect: categoryListId,
        },
      },
    });
  }

  async updateProduct(
    targetId: ProductId,
    product: ProductToUpdate,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    return await db.product.update({
      where: { id: targetId },
      data: {
        ...product,
        categoryList: { set: [...product.categoryList] },
      },
    });
  }

  async removeProductById(
    productId: ProductId,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    return await db.product.delete({ where: { id: productId } });
  }
}

export const productRepository = new ProductRepository(dbClient);
