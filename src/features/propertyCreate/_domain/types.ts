import {
  PropertyBase,
  PropertyCreateDTO,
  PropertyItemBase,
  PropertyItemCreateDTO,
} from "@/entities/property";

type PropertyCreatePayload = Omit<PropertyBase, "id">;
type PropertyItemCreatePayload = Omit<PropertyItemBase, "propertyId">;

export type PropertyCreateTxPayload = {
  propertyData: PropertyCreatePayload;
  propertyItemData: Array<PropertyItemCreatePayload>;
};

export type PropertyCreateTxDTO = {
  propertyData: Omit<PropertyCreateDTO["data"], "propertyId">;
  propertyItemData: Array<Omit<PropertyItemCreateDTO["data"], "propertyId">>;
};
