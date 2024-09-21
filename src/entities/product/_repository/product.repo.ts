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
} from "@/kernel/domain/product/product.dto";
import { ProductEntity } from "@/kernel/domain/product/product.type";
import { IProductRepository } from "@/kernel/domain/product/repository.type";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(readonly db: DBClient) {}

  async get(dto: ProductGetDTO, db: Tx = this.db): Promise<ProductEntity> {
    return db.product.findUniqueOrThrow({
      where: dto,
    });
  }

  async getWithRelation<T>(dto: ProductGetDTO, db: Tx = this.db): Promise<T> {
    const res = (await db.product.findUniqueOrThrow({
      where: dto,
      include: {
        categoryList: true,
        propertyItemList: true,
      },
    })) as unknown as T;

    return res;
  }

  async getBySlug(
    dto: ProductGetBySlugDTO,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    return db.product.findUniqueOrThrow({
      where: dto,
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
          in: idList.map(({ id }) => id),
        },
      },
    });
  }

  async searchList(
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
        id: { in: idList.map(({ id }) => id) },
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
    return await db.product.update({
      where: selector,
      data,
    });
  }

  async remove(
    dto: ProductRemoveDTO,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    const { selector } = dto;

    return await db.product.delete({ where: selector });
  }

  async bindToCategoryList(
    dto: ProductBindCategoryListListDTO,
    db: Tx = this.db,
  ): Promise<ProductEntity> {
    const { selector, data } = dto;
    const { categoryListId } = data;

    return await db.product.update({
      where: selector,
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
    const { propertyItemListId } = data;

    // const res = propertyListId.map(({ propertyId }) => ({ id: propertyId }));
    // console.log("output_log: res id =>>>", res);

    return db.product.update({
      where: selector,
      data: {
        propertyItemList: {
          set: propertyItemListId.map(({ propertyItemId }) => ({
            id: propertyItemId,
          })),
        },
      },
    });
  }
}
