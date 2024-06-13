import { injectable } from "inversify";
import { IPropertyRepository } from "../_domain/property/repository.type";
import { Property, PropertyGetSelector } from "../_domain/property/types";

@injectable()
export class PropertyGetWithRelationService {
  constructor(private readonly propertyRepo: IPropertyRepository) {}

  async execute(selector: PropertyGetSelector): Promise<Property> {
    return await this.propertyRepo.getWithRelation(selector);
  }
}
