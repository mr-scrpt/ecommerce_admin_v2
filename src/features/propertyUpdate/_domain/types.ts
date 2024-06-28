import { PropertyUpdateDTO } from "@/kernel/domain/property/property.dto";
import { PropertyBase } from "@/kernel/domain/property/property.type";
import { PropertyItemCreateDTO } from "@/kernel/domain/property/propertyItem.dto";
import { PropertyItemBase } from "@/kernel/domain/property/propertyItem.type";

type PropertyUpdatePayload = Partial<PropertyBase>;

export type PropertyItemUpdatePayload = Partial<PropertyItemBase> & {
  id?: string;
};

export type PropertyItemCreateData = Omit<
  PropertyItemCreateDTO["data"],
  "propertyId"
>;

export type PropertyItemUpdateData = Partial<
  Omit<PropertyItemCreateDTO["data"], "propertyId">
> & { id: string };

export type PropertyUpdateTxPayload = {
  selector: PropertyUpdateSelector;
  propertyData: PropertyUpdatePayload;
  propertyItemListData: Array<PropertyItemUpdatePayload>;
};

export type PropertyUpdateTxDTO = {
  selector: PropertyUpdateSelector;
  propertyData: Omit<PropertyUpdateDTO["data"], "id">;
  propertyItemListCreateData: Array<PropertyItemCreateData>;
  propertyItemListUpdateData: Array<PropertyItemUpdateData>;
};

// NOTE: Selector
export type PropertyUpdateSelector = {
  id: string;
};
