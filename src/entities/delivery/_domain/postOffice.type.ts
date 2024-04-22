export const baseQueryKey = "postOffice";

type PostOfficeBase = {
  siteKey: string;
  description: string;
  descriptionRu: string;
  shortAddress: string;
  shortAddressRu: string;
  phone: string;
  typeOfWarehouse: string;
  ref: string;
  number: string;
  cityRef: string;
  cityDescription: string;
  cityDescriptionRu: string;
  settlementRef: string;
  settlementDescription: string;
  settlementAreaDescription: string;
  settlementRegionsDescription: string;
  settlementTypeDescription: string;
  settlementTypeDescriptionRu: string;
  longitude: string;
  latitude: string;
  postFinance: string;
  bicycleParking: string;
  paymentAccess: string;
  postTerminal: string;
  internationalShipping: string;
  selfServiceWorkplacesCount: string;
  totalMaxWeightAllowed: string;
  placeMaxWeightAllowed: string;
  sendingLimitationsOnDimensions: {
    width: number;
    height: number;
    length: number;
  };
  receivingLimitationsOnDimensions: {
    width: number;
    height: number;
    length: number;
  };
  reception: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  delivery: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  schedule: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  districtCode: string;
  warehouseStatus: string;
  warehouseStatusDate: string;
  warehouseIllusha: string;
  categoryOfWarehouse: string;
  direct: string;
  regionCity: string;
  warehouseForAgent: string;
  generatorEnabled: string;
  maxDeclaredCost: string;
  workInMobileAwis: string;
  denyToSelect: string;
  canGetMoneyTransfer: string;
  hasMirror: string;
  hasFittingRoom: string;
  onlyReceivingParcel: string;
  postMachineType: string;
  postalCodeUA: string;
  warehouseIndex: string;
  beaconCode: string;
};

export type PostOfficeEntity = PostOfficeBase & {
  id: string;
  createdAt: Date;
};

// NOTE: Projetions

export type Settlement = PostOfficeBase;

// NOTE: Actions
export type PostOfficeToCreate = PostOfficeBase;
export type PostOfficeToUpdate = Settlement & {
  id: string;
};

// NOTE: UI
export type PostOfficeToSelect = {
  value: string;
  type: string;
  label: string;
};
