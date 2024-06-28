import { Tx } from "@/shared/lib/db/db";
import {
  ProductBindCategoryListListDTO,
  ProductBindPropertyListDTO,
  ProductCreateDTO,
  ProductGetByIdListDTO,
  ProductGetBySlugDTO,
  ProductGetDTO,
  ProductRemoveDTO,
  ProductSearchDTO,
  ProductTotalPriceGetDTO,
  ProductUpdateDTO,
} from "./product.dto";
import { ProductEntity } from "@/kernel/domain/product/product.type";

export abstract class IProductRepository {
  abstract get(dto: ProductGetDTO, db?: Tx): Promise<ProductEntity>;

  abstract getWithRelation<T>(dto: ProductGetDTO, db?: Tx): Promise<T>;

  abstract getBySlug(dto: ProductGetBySlugDTO, db?: Tx): Promise<ProductEntity>;

  abstract getList(db?: Tx): Promise<ProductEntity[]>;

  abstract getListByListId(
    dto: ProductGetByIdListDTO,
    db?: Tx,
  ): Promise<ProductEntity[]>;

  abstract searchList(dto: ProductSearchDTO, db?: Tx): Promise<ProductEntity[]>;

  abstract getTotalPrice(
    dto: ProductTotalPriceGetDTO,
    db?: Tx,
  ): Promise<number>;

  abstract create(dto: ProductCreateDTO, db?: Tx): Promise<ProductEntity>;

  abstract update(dto: ProductUpdateDTO, db?: Tx): Promise<ProductEntity>;

  abstract remove(dto: ProductRemoveDTO, db?: Tx): Promise<ProductEntity>;

  abstract bindToCategoryList(
    dto: ProductBindCategoryListListDTO,
    db?: Tx,
  ): Promise<ProductEntity>;

  abstract bindToPropertyList(
    dto: ProductBindPropertyListDTO,
    db?: Tx,
  ): Promise<ProductEntity>;
}
