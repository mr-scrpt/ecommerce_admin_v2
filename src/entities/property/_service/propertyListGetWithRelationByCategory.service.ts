import { injectable } from "inversify";
import { IPropertyRepository } from "../../../kernel/domain/property/repository.type";
import {
  PropertyListGetByCategoryListSelector,
  PropertyRelation,
} from "../_domain/property/property.types";

@injectable()
export class PropertyListGetWithRelationByCategoryListService {
  constructor(private readonly propertyRepo: IPropertyRepository) {}

  async execute(
    selector: PropertyListGetByCategoryListSelector,
  ): Promise<Array<PropertyRelation>> {
    return await this.propertyRepo.getWithRelationByCategoryIdList(selector);
  }
}
