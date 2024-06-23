import { injectable } from "inversify";
import { IPropertyRepository } from "../_domain/property/repository.type";
import { Property } from "../_domain/property/property.types";

@injectable()
export class PropertyListGetService {
  constructor(private readonly propertyRepo: IPropertyRepository) {}

  async execute(): Promise<Array<Property>> {
    return await this.propertyRepo.getList();
  }
}
