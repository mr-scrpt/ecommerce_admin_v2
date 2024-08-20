import { Property } from "@/kernel/domain/property/property.type";
import { IPropertyRepository } from "@/kernel/domain/property/repository.type";
import { injectable } from "inversify";
import { PropertyGetByCategorySelector } from "../../_domain/property/property.types";

@injectable()
export class PropertyListGetByCategoryService {
  constructor(private readonly propertyRepo: IPropertyRepository) {}

  async execute(
    selector: PropertyGetByCategorySelector,
  ): Promise<Array<Property>> {
    return await this.propertyRepo.getListByCategory(selector);
  }
}
