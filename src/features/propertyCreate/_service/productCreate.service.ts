import { Property } from "@/entities/property";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { injectable } from "inversify";
import { merge } from "lodash";
import { IPropertyCreateTx } from "../_domain/transaction.type";
import { PropertyCreateTxDTO, PropertyCreateTxPayload } from "../_domain/types";

@injectable()
export class PropertyCreateService {
  constructor(private readonly propertyCreateTx: IPropertyCreateTx) {}

  async execute(payload: PropertyCreateTxPayload): Promise<Property> {
    const propertyCreateDTO = this.build(payload);
    return await this.propertyCreateTx.create(propertyCreateDTO);
  }

  private build(payload: PropertyCreateTxPayload): PropertyCreateTxDTO {
    const {
      propertyData: { name },
    } = payload;

    const slug = slugGenerator(name);

    return merge({}, payload, {
      propertyData: {
        ...payload.propertyData,
        slug,
      },
    });
  }
}
