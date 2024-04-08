"use server";
import { z } from "zod";

import { Property, propertySchema } from "@/entities/property";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { removePropertyComplexibleUseCase } from "../_useCase/instans.usecase";

const propsSchema = z.object({
  propertyId: z.string(),
});

const resultSchema = z.object({
  property: propertySchema,
});

type ResultT = { property: Property };

export const removePropertyComplexibleAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { propertyId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const property = await removePropertyComplexibleUseCase.exec({
    propertyId,
    session,
  });

  return resultSchema.parseAsync({
    property,
  });
};
