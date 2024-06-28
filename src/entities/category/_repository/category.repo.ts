import {
  CategoryBindToProductListDTO,
  CategoryBindToPropertyListDTO,
  CategoryCreateDTO,
  CategoryGetBySlugDTO,
  CategoryGetDTO,
  CategoryRemoveBySlugDTO,
  CategoryRemoveDTO,
  CategoryUpdateDTO,
} from "@/kernel/domain/category/category.dto";
import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly db: DBClient) {}

  async get(dto: CategoryGetDTO, db: Tx = this.db): Promise<CategoryEntity> {
    const res = db.category.findUniqueOrThrow({
      where: dto,
    });

    return res;
  }

  async getWithRelation<T>(dto: CategoryGetDTO, db: Tx = this.db): Promise<T> {
    return (await db.category.findUniqueOrThrow({
      where: dto,
      include: {
        propertyList: true,
        productList: true,
      },
    })) as unknown as T;
  }

  async getBySlug(
    dto: CategoryGetBySlugDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    return db.category.findUniqueOrThrow({
      where: dto,
    });
  }

  async getBySlugRelation<T>(
    dto: CategoryGetBySlugDTO,
    db: Tx = this.db,
  ): Promise<T> {
    return (await db.category.findUniqueOrThrow({
      where: dto,
      include: {
        propertyList: true,
        productList: true,
      },
    })) as unknown as T;
  }

  async getList(db: Tx = this.db): Promise<CategoryEntity[]> {
    return db.category.findMany();
  }

  async create(
    dto: CategoryCreateDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { data } = dto;

    return await db.category.create({
      data,
    });
  }

  async update(
    dto: CategoryUpdateDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { data, selector } = dto;

    return await db.category.update({
      where: selector,
      data,
    });
  }

  async remove(
    dto: CategoryRemoveDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { selector } = dto;

    return await db.category.delete({ where: selector });
  }

  async removeBySlug(
    dto: CategoryRemoveBySlugDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { selector } = dto;

    return await db.category.delete({ where: selector });
  }

  async bindToPropertyList(
    dto: CategoryBindToPropertyListDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { target, data } = dto;
    const { propertyListId } = data;

    return await db.category.update({
      where: target,
      data: {
        propertyList: {
          set: propertyListId.map(({ propertyId }) => ({ id: propertyId })),
        },
      },
    });
  }

  async bindToProductList(
    dto: CategoryBindToProductListDTO,
    db: Tx = this.db,
  ): Promise<CategoryEntity> {
    const { target, data } = dto;
    const { productListId } = data;

    return await db.category.update({
      where: target,
      data: {
        productList: {
          connect: productListId.map(({ productId }) => ({ id: productId })),
        },
      },
    });
  }
}
