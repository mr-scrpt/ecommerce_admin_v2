// NOTE: Selector
export type PostOfficeGetSelector = {
  id: string;
};

export type PostOfficeGetBySettlementSelector = {
  settlementId: string;
};

// NOTE: UI
export type PostOfficeToSelect = {
  value: string;
  type: string;
  label: string;
};
