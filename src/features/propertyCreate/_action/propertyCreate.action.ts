"use server";

import {
  Property,
  propertyCreateSchema,
  propertySchema,
} from "@/entities/property";
import { z } from "zod";
import { createPropertyComplexibleUseCase } from "../_useCase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

const propsSchema = z.object({
  data: propertyCreateSchema,
});

const resultSchema = z.object({
  property: propertySchema,
});

type ResultT = { property: Property };

export const propertyCreateAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { data } = propsSchema.parse(props);
  const { propertyItemList, ...propertyData } = data;

  const session = await SessionContainer.getStrict();

  const property = await createPropertyComplexibleUseCase.exec({
    session,
    dataToCreate: {
      propertyItemListData: propertyItemList,
      propertyData: propertyData,
    },
  });

  return resultSchema.parseAsync({
    property,
  });
};
