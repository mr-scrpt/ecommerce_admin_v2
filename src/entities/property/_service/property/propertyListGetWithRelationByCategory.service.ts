import { injectable } from "inversify";
import { IPropertyRepository } from "../../../../kernel/domain/property/repository.type";
import {
  PropertyGetByCategoryListSelector,
  PropertyRelation,
} from "../../_domain/property/property.types";

@injectable()
export class PropertyListGetWithRelationByCategoryListService {
  constructor(private readonly propertyRepo: IPropertyRepository) {}

  async execute(
    selector: PropertyGetByCategoryListSelector,
  ): Promise<Array<PropertyRelation>> {
    return await this.propertyRepo.getWithRelationByCategoryIdList(selector);
  }
}
