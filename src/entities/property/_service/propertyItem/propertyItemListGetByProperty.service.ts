import { IPropertyItemRepository } from "@/kernel/domain/property/repository.type";
import { injectable } from "inversify";
import { PropertyItemGetByPropertySelector } from "../../_domain/propertyItem/propertyItem.types";
import { PropertyItem } from "@/kernel/domain/property/propertyItem.type";

@injectable()
export class PropertyItemListGetByPropertyService {
  constructor(private readonly propertyRepo: IPropertyItemRepository) {}

  async execute(
    selector: PropertyItemGetByPropertySelector,
  ): Promise<Array<PropertyItem>> {
    return await this.propertyRepo.getListByProperty(selector);
  }
}
