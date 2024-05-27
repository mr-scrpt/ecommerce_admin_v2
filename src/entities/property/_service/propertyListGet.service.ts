import { injectable } from "inversify";
import { PropertyRepository } from "../server";
import { PropertyEntity } from "../_domain/property/types";

@injectable()
export class PropertyListGetService {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async execute(): Promise<Array<PropertyEntity>> {
    return await this.propertyRepo.getPropertyList();
  }
}
