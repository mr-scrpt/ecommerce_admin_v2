import { IPropertyRepository } from "@/kernel/domain/property/repository.type";
import { injectable } from "inversify";
import { PropertyGetSelector } from "../../_domain/property/property.types";
import { Property } from "@/kernel/domain/property/property.type";

@injectable()
export class PropertyGetService {
  constructor(private readonly propertyRepo: IPropertyRepository) {}

  async execute(selector: PropertyGetSelector): Promise<Property> {
    return await this.propertyRepo.get(selector);
  }
}
