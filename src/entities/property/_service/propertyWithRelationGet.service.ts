import { injectable } from "inversify";
import { PropertyRepository } from "../server";
import { PropertyEntity } from "../_domain/property/types";

type PropertyGetWithRelation = {
  propertyId: string;
};

@injectable()
export class PropertyGetWithRelationService {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async execute(props: PropertyGetWithRelation): Promise<PropertyEntity> {
    return await this.propertyRepo.getPropertyWithRelation(props.propertyId);
  }
}
