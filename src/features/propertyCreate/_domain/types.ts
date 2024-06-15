import {
  PropertyBase,
  PropertyCreateDTO,
  PropertyItemBase,
  PropertyItemCreateDTO,
} from "@/entities/property";

type PropertyCreatePayload = PropertyBase;
type PropertyItemCreatePayload = Omit<PropertyItemBase, "propertyId">;

export type PropertyCreateTxPayload = {
  propertyData: PropertyCreatePayload;
  propertyItemData: Array<PropertyItemCreatePayload>;
};

export type PropertyCreateTxDTO = {
  propertyData: Omit<PropertyCreateDTO["data"], "id">;
  propertyItemData: Array<Omit<PropertyItemCreateDTO["data"], "propertyId">>;
};
