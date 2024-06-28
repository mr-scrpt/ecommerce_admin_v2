import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  PropertyCreateDTO,
  PropertyGetByCategoryIdListDTO,
  PropertyGetDTO,
  PropertyRemoveDTO,
  PropertyUpdateDTO,
} from "@/kernel/domain/property/property.dto";
import { IPropertyRepository } from "@/kernel/domain/property/repository.type";
import { PropertyRelationEntity } from "../_domain/property/property.types";
import { PropertyEntity } from "@/kernel/domain/property/property.type";

@injectable()
export class PropertyRepository implements IPropertyRepository {
  constructor(readonly db: DBClient) {}

  async get(dto: PropertyGetDTO, db: Tx = this.db): Promise<PropertyEntity> {
    const property = await db.property.findUniqueOrThrow({
      where: dto,
    });

    return property;
  }

  async getWithRelation<T>(dto: PropertyGetDTO, db: Tx = this.db): Promise<T> {
    const property = (await db.property.findUniqueOrThrow({
      where: dto,
      include: {
        categoryList: true,
        propertyItemList: true,
      },
    })) as unknown as T;

    // return {
    //   ...property,
    //   datatype: mapPrismaDatatypeToEnum(property.datatype),
    // };
    return property;
  }

  async getWithRelationByCategoryIdList<T>(
    dto: PropertyGetByCategoryIdListDTO,
    db: Tx = this.db,
  ): Promise<T[]> {
    const { categoryIdList } = dto;
    const propertyList = (await db.property.findMany({
      where: {
        categoryList: {
          some: {
            id: {
              in: categoryIdList.map(({ categoryId: id }) => id),
            },
          },
        },
      },
      include: {
        categoryList: true,
        propertyItemList: true,
      },
    })) as unknown as T[];

    // return propertyList.map((property) => ({
    //   ...property,
    //   datatype: mapPrismaDatatypeToEnum(property.datatype), // Преобразование типа данных
    // }));
    return propertyList;
  }

  async getList(db: Tx = this.db): Promise<PropertyEntity[]> {
    const propertyList = await db.property.findMany();

    // return propertyList.map((property) => ({
    //   ...property,
    //   datatype: mapPrismaDatatypeToEnum(property.datatype), // Преобразование типа данных
    // }));
    return propertyList;
  }

  async create(
    dto: PropertyCreateDTO,
    db: Tx = this.db,
  ): Promise<PropertyEntity> {
    const { data } = dto;

    const propertyCreated = await db.property.create({
      data,
    });
    // return {
    //   ...propertyCreated,
    //   datatype: mapPrismaDatatypeToEnum(propertyCreated.datatype),
    // };
    return propertyCreated;
  }

  async update(
    dto: PropertyUpdateDTO,
    db: Tx = this.db,
  ): Promise<PropertyEntity> {
    const { selector, data } = dto;
    // const prismaDatatype =
    //   propertyData.datatype !== undefined
    //     ? mapEnumToPrismaDatatype(propertyData.datatype)
    //     : undefined;

    const propertyUpdated = await db.property.update({
      where: selector,
      data,
    });

    // return {
    //   ...propertyUpdated,
    //   datatype: mapPrismaDatatypeToEnum(propertyUpdated.datatype),
    // };
    return propertyUpdated;
  }

  async remove(
    dto: PropertyRemoveDTO,
    db: Tx = this.db,
  ): Promise<PropertyEntity> {
    const { selector } = dto;
    const deletedProperty = await db.property.delete({
      where: selector,
    });
    // return {
    //   ...deletedProperty,
    //   datatype: mapPrismaDatatypeToEnum(deletedProperty.datatype),
    // };
    return deletedProperty;
  }
}
