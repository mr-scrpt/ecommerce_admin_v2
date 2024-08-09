import { ErrorApp } from "@/shared/error/error";
import { Tx } from "@/shared/lib/db/db";
import { Either } from "@sweet-monads/either";
import {
  CategoryBindToProductListDTO,
  CategoryBindToPropertyListDTO,
  CategoryCheckByNameDTO,
  CategoryCreateDTO,
  CategoryGetBySlugDTO,
  CategoryGetDTO,
  CategoryRemoveBySlugDTO,
  CategoryRemoveDTO,
  CategoryUpdateDTO,
} from "./category.dto";
import { CategoryEntity } from "./category.type";
import { CategoryNotBeenCreatedError } from "./error";

export abstract class ICategoryRepository {
  abstract get(
    dto: CategoryGetDTO,
    db?: Tx,
  ): Promise<Either<ErrorApp, CategoryEntity>>;

  abstract getWithRelation<T>(
    dto: CategoryGetDTO,
    db?: Tx,
  ): Promise<Either<ErrorApp, T>>;

  abstract getBySlug(
    dto: CategoryGetBySlugDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  abstract getBySlugRelation<T>(
    dto: CategoryGetBySlugDTO,
    db?: Tx,
  ): Promise<Either<ErrorApp, T>>;

  abstract getList(db?: Tx): Promise<CategoryEntity[]>;

  abstract create(
    dto: CategoryCreateDTO,
    db?: Tx,
  ): Promise<Either<CategoryNotBeenCreatedError, CategoryEntity>>;

  abstract update(dto: CategoryUpdateDTO, db?: Tx): Promise<CategoryEntity>;

  abstract remove(dto: CategoryRemoveDTO, db?: Tx): Promise<CategoryEntity>;

  abstract removeBySlug(
    dto: CategoryRemoveBySlugDTO,
    db?: Tx,
  ): Promise<CategoryEntity>;

  // abstract bindToPropertyList(
  //   dto: CategoryBindToPropertyListDTO,
  //   db?: Tx,
  // ): Promise<CategoryEntity>;

  abstract bindToPropertyList(
    dto: CategoryBindToPropertyListDTO,
    db?: Tx,
  ): Promise<Either<ErrorApp, CategoryEntity>>;

  abstract bindToProductList(
    dto: CategoryBindToProductListDTO,
    db?: Tx,
  ): Promise<Either<ErrorApp, CategoryEntity>>;

  abstract checkIsUniqueByName(
    dto: CategoryCheckByNameDTO,
    db?: Tx,
  ): Promise<Either<ErrorApp, boolean>>;
}
