import { injectable } from "inversify";
import { IPropertyRepository } from "../_domain/property/repository.type";
import {
  Property,
  PropertyListGetByCategoryListSelector,
} from "../_domain/property/types";

@injectable()
export class PropertyListGetWithRelationByCategoryListService {
  constructor(private readonly propertyRepo: IPropertyRepository) {}

  async execute(
    selector: PropertyListGetByCategoryListSelector,
  ): Promise<Array<Property>> {
    return await this.propertyRepo.getWithRelationByCategoryIdList(selector);
  }
}
