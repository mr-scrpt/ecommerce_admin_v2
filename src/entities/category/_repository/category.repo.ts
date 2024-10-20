import type {
  CategoryBindToProductListDTO,
  CategoryBindToPropertyListDTO,
  CategoryCreateDTO,
  CategoryGetByNameDTO,
  CategoryGetBySlugDTO,
  CategoryGetDTO,
  CategoryRemoveBySlugDTO,
  CategoryRemoveDTO,
  CategoryUpdateDTO,
} from "@/kernel/domain/category/category.dto";
import { CategoryEntity } from "@/kernel/domain/category/category.type";
import {
  CategoryBindProductError,
  CategoryBindPropertyError,
  CategoryNotBeenCreatedError,
  CategoryNotBeenUpdatedError,
  CategoryNotFoundError,
} from "@/kernel/domain/category/error";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { UnexpectedError } from "@/kernel/error/error.common";
import { ErrorApp } from "@/shared/error/error";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { Either, left, right } from "@sweet-monads/either";
import { injectable } from "inversify";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly db: DBClient) {}

  async get(
    dto: CategoryGetDTO,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, CategoryEntity>> {
    try {
      const res = await db.category.findFirst({
        where: dto,
      });

      if (!res) {
        return left(new CategoryNotFoundError());
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({ message: (e as any).message, cause: e }),
      );
    }
  }

  async getWithRelation<T>(
    dto: CategoryGetDTO,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, T>> {
    try {
      const res = (await db.category.findFirst({
        where: dto,
        include: {
          propertyList: true,
          productList: true,
        },
      })) as unknown as T;

      if (!res) {
        return left(new CategoryNotFoundError());
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({ message: (e as any).message, cause: e }),
      );
    }
  }

  async getByName(
    dto: CategoryGetByNameDTO,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, CategoryEntity>> {
    try {
      const res = await db.category.findFirst({
        where: dto,
      });

      if (!res) {
        return left(new CategoryNotFoundError());
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({ message: (e as any).message, cause: e }),
      );
    }
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
  ): Promise<Either<ErrorApp, T>> {
    try {
      const res = (await db.category.findFirst({
        where: dto,
        include: {
          propertyList: true,
          productList: true,
        },
      })) as unknown as T;

      if (!res) {
        return left(new CategoryNotFoundError());
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({ message: (e as any).message, cause: e }),
      );
    }
  }

  async getList(db: Tx = this.db): Promise<CategoryEntity[]> {
    return db.category.findMany();
  }

  async create(
    dto: CategoryCreateDTO,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, CategoryEntity>> {
    const { data } = dto;

    try {
      const res = await db.category.create({
        data,
      });

      if (!res) {
        return left(new CategoryNotBeenCreatedError());
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({ message: (e as any).message, cause: e }),
      );
    }
  }

  async update(
    dto: CategoryUpdateDTO,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, CategoryEntity>> {
    const { data, selector } = dto;

    try {
      const res = await db.category.update({
        where: selector,
        data,
      });

      if (!res) {
        return left(new CategoryNotBeenUpdatedError());
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({ message: (e as any).message, cause: e }),
      );
    }
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
  ): Promise<Either<ErrorApp, CategoryEntity>> {
    const { target, data } = dto;
    const { propertyListId } = data;

    try {
      const res = await db.category.update({
        where: target,
        data: {
          propertyList: {
            set: propertyListId.map(({ propertyId }) => ({
              id: propertyId,
            })),
          },
        },
      });

      if (!res) {
        return left(new CategoryNotBeenUpdatedError());
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({ message: (e as any).message, cause: e }),
      );
    }
  }

  async bindToProductList(
    dto: CategoryBindToProductListDTO,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, CategoryEntity>> {
    const { target, data } = dto;
    const { productListId } = data;

    try {
      const res = await db.category.update({
        where: target,
        data: {
          productList: {
            set: productListId.map(({ productId }) => ({ id: productId })),
          },
        },
      });

      if (!res) {
        return left(new CategoryBindProductError());
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({ message: (e as any).message, cause: e }),
      );
    }
  }
}
