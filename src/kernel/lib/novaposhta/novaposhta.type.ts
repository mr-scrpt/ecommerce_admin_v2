// NOTE: Base response type
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

// NOTE: Settlement
export type SettlementNovaPoshta = {
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

export type SettlementNovaPoshtaIndex = SettlementNovaPoshta & {
  [key: string]: any;
};

export type PostOfficeNovaPoshta = {
  SiteKey: string;
  Description: string;
  DescriptionRu: string;
  ShortAddress: string;
  ShortAddressRu: string;
  Phone: string;
  TypeOfWarehouse: string;
  Ref: string;
  Number: string;
  CityRef: string;
  CityDescription: string;
  CityDescriptionRu: string;
  SettlementRef: string;
  SettlementDescription: string;
  SettlementAreaDescription: string;
  SettlementRegionsDescription: string;
  SettlementTypeDescription: string;
  SettlementTypeDescriptionRu: string;
  Longitude: string;
  Latitude: string;
  PostFinance: string;
  // BicycleParking: string;
  // PaymentAccess: string;
  // POSTerminal: string;
  // InternationalShipping: string;
  // SelfServiceWorkplacesCount: string;
  // TotalMaxWeightAllowed: string;
  // PlaceMaxWeightAllowed: string;
  // SendingLimitationsOnDimensions: {
  //   Width: number;
  //   Height: number;
  //   Length: number;
  // };
  // ReceivingLimitationsOnDimensions: {
  //   Width: number;
  //   Height: number;
  //   Length: number;
  // };
  // Reception: {
  //   Monday: string;
  //   Tuesday: string;
  //   Wednesday: string;
  //   Thursday: string;
  //   Friday: string;
  //   Saturday: string;
  //   Sunday: string;
  // };
  // Delivery: {
  //   Monday: string;
  //   Tuesday: string;
  //   Wednesday: string;
  //   Thursday: string;
  //   Friday: string;
  //   Saturday: string;
  //   Sunday: string;
  // };
  // Schedule: {
  //   Monday: string;
  //   Tuesday: string;
  //   Wednesday: string;
  //   Thursday: string;
  //   Friday: string;
  //   Saturday: string;
  //   Sunday: string;
  // };
  // DistrictCode: string;
  // WarehouseStatus: string;
  // WarehouseStatusDate: string;
  // WarehouseIllusha: string;
  // CategoryOfWarehouse: string;
  // Direct: string;
  // RegionCity: string;
  // WarehouseForAgent: string;
  // GeneratorEnabled: string;
  // MaxDeclaredCost: string;
  // WorkInMobileAwis: string;
  // DenyToSelect: string;
  // CanGetMoneyTransfer: string;
  // HasMirror: string;
  // HasFittingRoom: string;
  // OnlyReceivingParcel: string;
  // PostMachineType: string;
  // PostalCodeUA: string;
  // WarehouseIndex: string;
  // BeaconCode: string;
};

export type PostOfficeNovaPoshtaIndex = PostOfficeNovaPoshta & {
  [key: string]: any;
};
