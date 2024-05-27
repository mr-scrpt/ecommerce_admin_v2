import { injectable } from "inversify";
import { PropertyRepository } from "../server";
import {
  PropertyEntity,
  PropertyRelationEntity,
} from "../_domain/property/types";
import { OperationsMap } from "@/shared/type/operation.type";

type PropertyListWithRelationBy = {
  categoryIdList?: Array<string>;
};

type PropertyListRelation = Array<PropertyRelationEntity>;

@injectable()
export class PropertyListWithRelationGetByService {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async execute(
    props: PropertyListWithRelationBy,
  ): Promise<Array<PropertyEntity>> {
    return await this.operation(props);
  }

  async operation(
    props: PropertyListWithRelationBy,
  ): Promise<PropertyListRelation> {
    const operationsMap: OperationsMap<PropertyListRelation, Array<string>> = {
      categoryListId: (categoryListId: Array<string>) =>
        this.propertyRepo.getPropertyWithRelationByCategory(categoryListId),
    };

    for (const key of Object.keys(props)) {
      const value = props[key as keyof PropertyListWithRelationBy];
      if (value && operationsMap[key]) {
        return await operationsMap[key](value);
      }
    }

    // TODO: Error custom handling
    throw new Error("Either 'categoryId' or 'categorySlug' must be provided.");
  }
}
