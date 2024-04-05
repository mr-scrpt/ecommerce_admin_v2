import { DBClient, Tx, dbClient } from "@/shared/lib/db";
import {
  Property,
  PropertyEntity,
  PropertyId,
  PropertyRelationEntity,
  PropertyToCreate,
} from "../_domain/property/types";

export class PropertyRepository {
  constructor(readonly db: DBClient) {}

  async getProperty(
    propertyId: PropertyId,
    db: Tx = this.db,
  ): Promise<PropertyEntity> {
    const property = await db.property.findUniqueOrThrow({
      where: {
        id: propertyId,
      },
    });

    // return {
    //   ...property,
    //   datatype: mapPrismaDatatypeToEnum(property.datatype),
    // };
    return property;
  }

  async getPropertyWithRelation(
    propertyId: PropertyId,
    db: Tx = this.db,
  ): Promise<PropertyRelationEntity> {
    const property = await db.property.findUniqueOrThrow({
      where: {
        id: propertyId,
      },
      include: {
        categoryList: true,
        propertyItemList: true,
      },
    });

    // return {
    //   ...property,
    //   datatype: mapPrismaDatatypeToEnum(property.datatype),
    // };
    return property;
  }

  async getPropertyWithRelationByCategory(
    categoryIdList: Array<string>,
    db: Tx = this.db,
  ): Promise<PropertyRelationEntity[]> {
    const propertyList = await db.property.findMany({
      where: {
        categoryList: {
          some: {
            id: {
              in: categoryIdList,
            },
          },
        },
      },
      include: {
        categoryList: true,
        propertyItemList: true,
      },
    });

    // return propertyList.map((property) => ({
    //   ...property,
    //   datatype: mapPrismaDatatypeToEnum(property.datatype), // Преобразование типа данных
    // }));
    return propertyList;
  }

  async getPropertyList(db: Tx = this.db): Promise<PropertyEntity[]> {
    const propertyList = await db.property.findMany();

    // return propertyList.map((property) => ({
    //   ...property,
    //   datatype: mapPrismaDatatypeToEnum(property.datatype), // Преобразование типа данных
    // }));
    return propertyList;
  }

  async createProperty(
    propertyData: PropertyToCreate,
    db: Tx = this.db,
  ): Promise<PropertyEntity> {
    console.log("output_log: propertyData =>>>", propertyData);
    const propertyCreated = await db.property.create({
      data: {
        ...propertyData,
        // datatype: mapEnumToPrismaDatatype(propertyData.datatype),
      },
    });
    // return {
    //   ...propertyCreated,
    //   datatype: mapPrismaDatatypeToEnum(propertyCreated.datatype),
    // };
    return propertyCreated;
  }

  async updateProperty(
    targetId: PropertyId,
    propertyData: Partial<Property>,
    db: Tx = this.db,
  ): Promise<PropertyEntity> {
    // const prismaDatatype =
    //   propertyData.datatype !== undefined
    //     ? mapEnumToPrismaDatatype(propertyData.datatype)
    //     : undefined;

    const propertyUpdated = await db.property.update({
      where: { id: targetId },
      data: {
        ...propertyData,
        // datatype: prismaDatatype ?? undefined,
      },
    });

    // return {
    //   ...propertyUpdated,
    //   datatype: mapPrismaDatatypeToEnum(propertyUpdated.datatype),
    // };
    return propertyUpdated;
  }

  async removePropertyById(
    propertyId: PropertyId,
    db: Tx = this.db,
  ): Promise<PropertyEntity> {
    const deletedProperty = await db.property.delete({
      where: { id: propertyId },
    });
    // return {
    //   ...deletedProperty,
    //   datatype: mapPrismaDatatypeToEnum(deletedProperty.datatype),
    // };
    return deletedProperty;
  }
}

export const propertyRepository = new PropertyRepository(dbClient);
