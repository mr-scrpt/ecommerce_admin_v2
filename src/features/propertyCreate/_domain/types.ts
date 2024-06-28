import { PropertyCreateDTO } from "@/kernel/domain/property/property.dto";
import { PropertyBase } from "@/kernel/domain/property/property.type";
import { PropertyItemCreateDTO } from "@/kernel/domain/property/propertyItem.dto";
import { PropertyItemBase } from "@/kernel/domain/property/propertyItem.type";

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
