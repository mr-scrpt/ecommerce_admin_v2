import { injectable } from "inversify";
import { PropertyGetSelector } from "../../_domain/property/property.types";
import { IPropertyRepository } from "@/kernel/domain/property/repository.type";
import { Property } from "@/kernel/domain/property/property.type";

@injectable()
export class PropertyGetWithRelationService {
  constructor(private readonly propertyRepo: IPropertyRepository) {}

  async execute(selector: PropertyGetSelector): Promise<Property> {
    return await this.propertyRepo.getWithRelation(selector);
  }
}
