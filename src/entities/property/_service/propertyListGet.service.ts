import { Property } from "@/kernel/domain/property/property.type";
import { IPropertyRepository } from "@/kernel/domain/property/repository.type";
import { injectable } from "inversify";

@injectable()
export class PropertyListGetService {
  constructor(private readonly propertyRepo: IPropertyRepository) {}

  async execute(): Promise<Array<Property>> {
    return await this.propertyRepo.getList();
  }
}
