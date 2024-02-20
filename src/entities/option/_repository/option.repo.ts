import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  Option,
  OptionEntity,
  OptionId,
  OptionRelationEntity,
  OptionToCreate,
} from "../_domain/option/types";
import {
  mapEnumToPrismaDatatype,
  mapPrismaDatatypeToEnum,
} from "../../../shared/type/mapOptionDatatype";

export class OptionRepository {
  constructor(readonly db: DbClient) {}

  async getOption(optionId: OptionId, db: Tx = this.db): Promise<OptionEntity> {
    const option = await db.option.findUniqueOrThrow({
      where: {
        id: optionId,
      },
    });

    return {
      ...option,
      datatype: mapPrismaDatatypeToEnum(option.datatype),
    };
  }

  async getOptionRelation(
    optionId: OptionId,
    db: Tx = this.db,
  ): Promise<OptionRelationEntity> {
    const option = await db.option.findUniqueOrThrow({
      where: {
        id: optionId,
      },
      include: {
        categoryList: true,
        optionItemList: true,
      },
    });

    return {
      ...option,
      datatype: mapPrismaDatatypeToEnum(option.datatype),
    };
  }

  async getOptionWithRelation(
    optionId: OptionId,
    db: Tx = this.db,
  ): Promise<OptionRelationEntity> {
    const option = await db.option.findUniqueOrThrow({
      where: {
        id: optionId,
      },
      include: {
        categoryList: true,
        optionItemList: true,
      },
    });

    return {
      ...option,
      datatype: mapPrismaDatatypeToEnum(option.datatype),
    };
  }

  async getOptionList(db: Tx = this.db): Promise<OptionEntity[]> {
    const options = await db.option.findMany();

    return options.map((option) => ({
      id: option.id,
      name: option.name,
      datatype: mapPrismaDatatypeToEnum(option.datatype), // Преобразование типа данных
      createdAt: option.createdAt,
      updatedAt: option.updatedAt,
    }));
  }

  async createOption(
    optionData: OptionToCreate,
    db: Tx = this.db,
  ): Promise<OptionEntity> {
    console.log("output_log: optionData =>>>", optionData);
    const optionCreated = await db.option.create({
      data: {
        ...optionData,
        datatype: mapEnumToPrismaDatatype(optionData.datatype),
      },
    });
    return {
      ...optionCreated,
      datatype: mapPrismaDatatypeToEnum(optionCreated.datatype),
    };
  }

  async updateOption(
    targetId: OptionId,
    optionData: Partial<Option>,
    db: Tx = this.db,
  ): Promise<OptionEntity> {
    const prismaDatatype =
      optionData.datatype !== undefined
        ? mapEnumToPrismaDatatype(optionData.datatype)
        : undefined;

    const optionUpdated = await db.option.update({
      where: { id: targetId },
      data: {
        ...optionData,
        datatype: prismaDatatype ?? undefined,
      },
    });

    return {
      ...optionUpdated,
      datatype: mapPrismaDatatypeToEnum(optionUpdated.datatype),
    };
  }

  async removeOptionById(
    optionId: OptionId,
    db: Tx = this.db,
  ): Promise<OptionEntity> {
    const deletedOption = await db.option.delete({ where: { id: optionId } });
    return {
      ...deletedOption,
      datatype: mapPrismaDatatypeToEnum(deletedOption.datatype),
    };
  }
}

export const optionRepository = new OptionRepository(dbClient);
