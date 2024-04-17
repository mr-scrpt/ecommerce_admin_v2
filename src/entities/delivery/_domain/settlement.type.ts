type SettlementBase = {
  ref: string;
  settlementType: string;
  latitude: string;
  longitude: string;
  description: string;
  descriptionRu: string;
  descriptionTranslit: string;
  settlementTypeDescription: string;
  settlementTypeDescriptionRu: string;
  settlementTypeDescriptionTranslit: string;
  region: string;
  regionsDescription: string;
  regionsDescriptionRu: string;
  regionsDescriptionTranslit: string;
  area: string;
  areaDescription: string;
  areaDescriptionRu: string;
  areaDescriptionTranslit: string;
  index1: string;
  index2: string;
  indexCOATSU1: string;
  delivery1: string;
  delivery2: string;
  delivery3: string;
  delivery4: string;
  delivery5: string;
  delivery6: string;
  delivery7: string;
  specialCashCheck: number;
  radiusHomeDelivery: string;
  radiusExpressPickUp: string;
  radiusDrop: string;
  warehouse: string;
};

export type SettlementEntity = SettlementBase & {
  id: string;
  createdAt: Date;
};

// NOTE: Projetions

export type Settlement = SettlementBase; // NOTE: Actions
export type SettlementToCreate = Settlement;
export type SettlementToUpdate = Settlement & {
  id: string;
};
