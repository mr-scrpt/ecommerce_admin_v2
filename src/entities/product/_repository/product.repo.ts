import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  Product,
  ProductEntity,
  ProductId,
  ProductRelation,
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
  ): Promise<ProductEntity> {
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
    product: ProductRelation,
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
    productData: Partial<Product>,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    return await db.product.update({
      where: { id: targetId },
      data: productData,
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
