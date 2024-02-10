import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import { Category, CategoryEntity, CategoryId } from "../_domain/types";

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
  async getCategorySlug(
    slug: string,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return db.category.findUniqueOrThrow({
      where: {
        slug,
      },
    });
  }

  async getCategoryList(db: Tx = this.db): Promise<CategoryEntity[]> {
    return db.category.findMany();
  }

  async createCategory(
    category: CategoryEntity,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return await db.category.create({
      data: category,
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
