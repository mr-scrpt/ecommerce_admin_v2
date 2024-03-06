import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  Category,
  CategoryAddPropertyList,
  CategoryAddProductList,
  CategoryEntity,
  CategoryId,
  CategoryRelationEntity,
  CategoryToCreate,
} from "../_domain/types";
import { mapPrismaDatatypeToEnum } from "@/shared/lib/prisma";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";

export class CategoryRepository {
  constructor(readonly db: DbClient) {}

  async getCategory(
    categoryId: CategoryId,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return db.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
    });
  }

  async getCategoryWithRelation(
    categoryId: CategoryId,
    db: Tx = this.db,
  ): Promise<CategoryRelationEntity> {
    const res = await db.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
      include: {
        propertyList: true,
        productList: true,
      },
    });

    return {
      ...res,
      propertyList: res.propertyList.map((item) => ({
        ...item,
        datatype: mapPrismaDatatypeToEnum(item.datatype),
      })),
    };
  }

  async getCategoryBySlug(
    slug: string,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return db.category.findUniqueOrThrow({
      where: {
        slug,
      },
    });
  }

  async getCategoryRelation(
    categoryId: CategoryId,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
      include: {
        propertyList: true,
        productList: true,
      },
    });
  }

  async getCategoryList(db: Tx = this.db): Promise<CategoryEntity[]> {
    // TEST
    const session = await getAppSessionStrictServer();
    console.log("output_log: session =>>>", session);
    return db.category.findMany();
  }

  async createCategory(
    category: CategoryToCreate,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.create({
      data: category,
    });
  }

  async addCategoryPropertyList(
    data: CategoryAddPropertyList,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { categoryId, propertyListId } = data;
    return await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        propertyList: {
          set: propertyListId,
        },
      },
    });
  }

  async addCategoryProductList(
    data: CategoryAddProductList,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { categoryId, productListId } = data;
    return await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        productList: {
          connect: productListId,
        },
      },
    });
  }

  async updateCategory(
    targetId: CategoryId,
    categoryData: Partial<Category>,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.update({
      where: { id: targetId },
      data: categoryData,
    });
  }

  async removeCategoryById(
    categoryId: CategoryId,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.delete({ where: { id: categoryId } });
  }
}

export const categoryRepository = new CategoryRepository(dbClient);
