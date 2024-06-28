import { StaffBase } from "./staff.type";

// NOTE: Queries
export type StaffGetDTO = {
  id: string;
};

export type StaffSearchDTO = {
  q: string;
};

// NOTE: Mutations
export type StaffCreateDTO = {
  data: StaffBase;
};

export type StaffUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<StaffBase>;
};

export type StaffRemoveDTO = {
  selector: {
    id: string;
  };
};
