import { injectable } from "inversify";
import { PropertyRepository } from "../server";
import { PropertyEntity } from "../_domain/property/types";

type PropertyGet = {
  propertyId: string;
};

@injectable()
export class PropertyGetService {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async execute(props: PropertyGet): Promise<PropertyEntity> {
    return await this.propertyRepo.getProperty(props.propertyId);
  }
}
