"use server";
import { z } from "zod";

import {
  Property,
  propertySchema,
  propertyUpdateSchema,
} from "@/entities/property";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { updatePropertyComplexibleUseCase } from "../_useCase/instans.usecase";

const propsSchema = z.object({
  propertyId: z.string(),
  data: propertyUpdateSchema,
});

const resultSchema = z.object({
  property: propertySchema,
});

type ResultT = { property: Property };

export const updatePropertyAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { propertyId, data } = propsSchema.parse(props);
  const { propertyItemList: propertyItemListData, ...propertyData } = data;

  const session = await getAppSessionStrictServer();

  const property = await updatePropertyComplexibleUseCase.exec({
    session,
    dataToUpdate: {
      propertyId,
      propertyData,
      propertyItemListData,
    },
  });

  return resultSchema.parseAsync({
    property,
  });
};
