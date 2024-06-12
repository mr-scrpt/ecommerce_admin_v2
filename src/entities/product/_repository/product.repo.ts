import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
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
} from "../_domain/product.dto";
import { ProductEntity, ProductRelationEntity } from "../_domain/types";
import { IProductRepository } from "../_domain/repository.type";

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(readonly db: DBClient) {}

  async get(dto: ProductGetDTO, db: Tx = this.db): Promise<ProductEntity> {
    const { id } = dto;
    return db.product.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async getWithRelation(
    dto: ProductGetDTO,
    db: Tx = this.db,
  ): Promise<ProductRelationEntity> {
    const { id } = dto;
    return db.product.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        categoryList: true,
        propertyItemListSelected: true,
      },
    });
  }

  async getBySlug(
    dto: ProductGetBySlugDTO,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    const { slug } = dto;
    return db.product.findUniqueOrThrow({
      where: {
        slug,
      },
    });
  }

  async getList(db: Tx = this.db): Promise<ProductEntity[]> {
    return db.product.findMany();
  }

  async getListByListId(
    dto: ProductGetByIdListDTO,
    db: Tx = this.db,
  ): Promise<ProductEntity[]> {
    const { idList } = dto;
    return db.product.findMany({
      where: {
        id: {
          in: idList,
        },
      },
    });
  }

  async getListSearch(
    dto: ProductSearchDTO,
    db: Tx = this.db,
  ): Promise<ProductEntity[]> {
    const { q } = dto;
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
    dto: ProductTotalPriceGetDTO,
    db: Tx = this.db,
  ): Promise<number> {
    const { idList } = dto;
    const totalPrice = await db.product.aggregate({
      where: {
        id: { in: idList },
      },
      _sum: {
        price: true,
      },
    });
    return totalPrice._sum.price || 0;
  }

  async create(
    dto: ProductCreateDTO,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    const { data } = dto;
    return await db.product.create({
      data,
    });
  }

  async update(
    dto: ProductUpdateDTO,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    const { selector, data } = dto;
    const { id } = selector;
    return await db.product.update({
      where: { id },
      data,
    });
  }

  async remove(
    dto: ProductRemoveDTO,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    const {
      selector: { id },
    } = dto;

    return await db.product.delete({ where: { id } });
  }

  async bindToCategoryList(
    dto: ProductBindCategoryListListDTO,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    const { selector, data } = dto;
    const { id } = selector;
    const { categoryListId } = data;

    return await db.product.update({
      where: {
        id,
      },
      data: {
        categoryList: {
          set: categoryListId.map(({ categoryId }) => ({ id: categoryId })),
        },
      },
    });
  }

  bindToPropertyList(
    dto: ProductBindPropertyListDTO,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    const { selector, data } = dto;
    const { id } = selector;
    const { propertyItemListId: propertyListId } = data;

    // const res = propertyListId.map(({ propertyId }) => ({ id: propertyId }));
    // console.log("output_log: res id =>>>", res);

    return db.product.update({
      where: {
        id,
      },
      data: {
        propertyItemListSelected: {
          set: propertyListId.map(({ propertyItemId }) => ({
            id: propertyItemId,
          })),
        },
      },
    });
  }
}
