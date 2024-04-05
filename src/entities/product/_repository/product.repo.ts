import { DBClient, Tx, dbClient } from "@/shared/lib/db";
import {
  ProductAddCategoryList,
  ProductAddPropertyList,
  ProductEntity,
  ProductId,
  ProductRelationEntity,
  ProductToCreate,
  ProductToUpdate,
} from "../_domain/types";

export class ProductRepository {
  constructor(readonly db: DBClient) {}

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
        propertyItemListSelected: true,
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
  async getProductListById(
    productListId: Array<ProductId>,
    db: Tx = this.db,
  ): Promise<ProductEntity[]> {
    return db.product.findMany({
      where: {
        id: {
          in: productListId,
        },
      },
    });
  }

  async getProductListSearch(
    q: string,
    db: Tx = this.db,
  ): Promise<ProductEntity[]> {
    const productList = await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            article: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return productList;
  }

  async getTotalPrice(
    productIdList: Array<ProductId>,
    db: Tx = this.db,
  ): Promise<number> {
    const totalPrice = await db.product.aggregate({
      where: {
        id: { in: productIdList },
      },
      _sum: {
        price: true,
      },
    });
    return totalPrice._sum.price || 0;
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
          set: categoryListId,
        },
      },
    });
  }

  addPropertyList(
    data: ProductAddPropertyList,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    const { productId, propertyListId } = data;
    console.log("output_log: in repo =>>>", productId, propertyListId);
    return db.product.update({
      where: {
        id: productId,
      },
      data: {
        propertyItemListSelected: {
          set: [...propertyListId],
        },
      },
    });
  }

  async updateProduct(
    targetId: ProductId,
    product: Partial<ProductToUpdate>,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    return await db.product.update({
      where: { id: targetId },
      data: product,
    });
  }
  // async updateProduct(
  //   targetId: ProductId,
  //   product: ProductToUpdate,
  //   db: Tx = this.db,
  // ): Promise<ProductEntity> {
  //   return await db.product.update({
  //     where: { id: targetId },
  //     data: {
  //       ...product,
  //       categoryList: { set: [...product.categoryList] },
  //       propertyItemListSelected: {
  //         set: [...product.propertyItemListSelected],
  //       },
  //     },
  //   });
  // }

  async removeProductById(
    productId: ProductId,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    return await db.product.delete({ where: { id: productId } });
  }
}

export const productRepository = new ProductRepository(dbClient);
