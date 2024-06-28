import { ConsumerBase } from "./consumer.type";

// NOTE: Queries
export type ConsumerGetDTO = {
  id: string;
};

export type ConsumerSearchDTO = {
  q: string;
};

// NOTE: Mutations
export type ConsumerCreateDTO = {
  data: ConsumerBase;
};

export type ConsumerUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<ConsumerBase>;
};

export type ConsumerRemoveDTO = {
  selector: {
    id: string;
  };
};
