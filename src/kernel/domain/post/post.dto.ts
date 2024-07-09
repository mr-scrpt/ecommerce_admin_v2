// NOTE: Queries
export type PostOfficeGetDTO = {
  id: string;
};

export type PostOfficeGetBySettlementRefDTO = {
  settlementRef: string;
};

export type PostOfficeListGetBySettlementDTO = {
  settlementId: string;
};

// // NOTE: Mutations
// export type PostCreateDTO = PostBase;
//
// export type PostUpdateDTO = {
//   selector: {
//     id: string;
//   };
//   data: Partial<PostBase>;
// };
//
