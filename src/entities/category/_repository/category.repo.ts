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
  CategoryNotFoundError,
  CategoryUnexpectedError,
} from "@/kernel/domain/category/error";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { UnexpectedError } from "@/kernel/error/errors/error.common";
import { ErrorApp } from "@/shared/error/error";
import { ERROR_APP_LAYER } from "@/shared/error/type";
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
        return left(new CategoryNotFoundError({ layer: ERROR_APP_LAYER.DB }));
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
        }),
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
        return left(new CategoryNotFoundError({ layer: ERROR_APP_LAYER.DB }));
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
        }),
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
        return left(new CategoryNotFoundError({ layer: ERROR_APP_LAYER.DB }));
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
        }),
      );
    }
  }

  async getBySlug(
    dto: CategoryGetBySlugDTO,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, CategoryEntity>> {
    try {
      const res = await db.category.findFirst({
        where: dto,
      });

      if (!res) {
        return left(new CategoryNotFoundError({ layer: ERROR_APP_LAYER.DB }));
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
        }),
      );
    }
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
        return left(new CategoryNotFoundError({ layer: ERROR_APP_LAYER.DB }));
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
        }),
      );
    }
  }

  async getList(
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, Array<CategoryEntity>>> {
    try {
      const res = await db.category.findMany();

      if (!res) {
        return left(new CategoryNotFoundError({ layer: ERROR_APP_LAYER.DB }));
      }
      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
        }),
      );
    }
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
        return left(new CategoryNotFoundError({ layer: ERROR_APP_LAYER.DB }));
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
        }),
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

      // throw new Error("Not Implemented UPDATE");
      if (!res) {
        return left(
          new CategoryNotFoundError({
            layer: ERROR_APP_LAYER.DB,
            details: JSON.stringify(dto),
          }),
        );
      }

      return right(res);
    } catch (e) {
      return left(
        new CategoryUnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
          details: JSON.stringify(dto),
        }),
      );
    }
  }

  async remove(
    dto: CategoryRemoveDTO,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, CategoryEntity>> {
    const { selector } = dto;
    try {
      const res = await db.category.delete({ where: selector });

      if (!res) {
        return left(new CategoryNotFoundError({ layer: ERROR_APP_LAYER.DB }));
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
        }),
      );
    }
  }

  async removeBySlug(
    dto: CategoryRemoveBySlugDTO,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, CategoryEntity>> {
    const { selector } = dto;

    try {
      const res = await db.category.delete({ where: selector });

      if (!res) {
        return left(new CategoryNotFoundError({ layer: ERROR_APP_LAYER.DB }));
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
        }),
      );
    }
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
        return left(new CategoryNotFoundError({ layer: ERROR_APP_LAYER.DB }));
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
        }),
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
        return left(new CategoryNotFoundError({ layer: ERROR_APP_LAYER.DB }));
      }

      return right(res);
    } catch (e) {
      return left(
        new UnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
        }),
      );
    }
  }
}
