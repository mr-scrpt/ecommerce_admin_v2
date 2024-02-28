"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { propertySchema } from "../../_domain/property/property.schema";
import { Property } from "../../_domain/property/types";
import { getPropertyUseCase } from "../../_usecase/property/getProperty.usecase";

const propsSchema = z.object({
  propertyId: z.string(),
});

const resultSchema = z.object({
  property: propertySchema,
});

type ResultT = { property: Property };

export const getPropertyAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { propertyId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const property = await getPropertyUseCase.exec({
    session,
    propertyId,
  });

  return resultSchema.parseAsync({
    property: property,
  });
};
