import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  Product,
  ProductEntity,
  ProductId,
  ProductRelation,
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
      data: {
        ...product,
        categoryList: { connect: [...product.categoryList] },
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
