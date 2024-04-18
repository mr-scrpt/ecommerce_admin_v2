export type NovaPoshtaResponse<T> = {
  success: boolean;
  data: T;
  errors: string[];
  warnings: string[];
  info: {
    totalCount: number;
  };
  messageCodes: string[];
  errorCodes: string[];
  warningCodes: string[];
  infoCodes: string[];
};

export type SettlementNovaPostha = {
  Ref: string;
  SettlementType: string;
  Latitude: string;
  Longitude: string;
  Description: string;
  DescriptionRu: string;
  DescriptionTranslit: string;
  SettlementTypeDescription: string;
  SettlementTypeDescriptionRu: string;
  SettlementTypeDescriptionTranslit: string;
  Region: string;
  RegionsDescription: string;
  RegionsDescriptionRu: string;
  RegionsDescriptionTranslit: string;
  Area: string;
  AreaDescription: string;
  AreaDescriptionRu: string;
  AreaDescriptionTranslit: string;
  Index1: string;
  Index2: string;
  IndexCOATSU1: string;
  Delivery1: string;
  Delivery2: string;
  Delivery3: string;
  Delivery4: string;
  Delivery5: string;
  Delivery6: string;
  Delivery7: string;
  SpecialCashCheck: number;
  RadiusHomeDelivery: string;
  RadiusExpressPickUp: string;
  RadiusDrop: string;
  Warehouse: string;
};

export type SettlementNovaPosthaIndex = SettlementNovaPostha & {
  [key: string]: any;
};
