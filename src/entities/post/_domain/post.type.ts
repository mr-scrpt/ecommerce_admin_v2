// NOTE: Selector
export type PostOfficeGetSelector = {
  id: string;
};

export type PostOfficeGetBySettlementSelector = {
  settlementId: string;
};

export type PostOfficeGetBySettlementRefSelector = {
  settlementRef: string;
};

// NOTE: UI
export type PostOfficeToSelect = {
  value: string;
  type: string;
  label: string;
};
