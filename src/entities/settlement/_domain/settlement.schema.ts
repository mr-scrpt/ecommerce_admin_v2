import { z } from "zod";

// NOTE: Base Schema
const settlementBaseSchema = z.object({
  ref: z.string(),
  settlementType: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  description: z.string(),
  descriptionRu: z.string(),
  descriptionTranslit: z.string(),
  settlementTypeDescription: z.string(),
  settlementTypeDescriptionRu: z.string(),
  settlementTypeDescriptionTranslit: z.string(),
  region: z.string(),
  regionsDescription: z.string(),
  regionsDescriptionRu: z.string(),
  regionsDescriptionTranslit: z.string(),
  area: z.string(),
  areaDescription: z.string(),
  areaDescriptionRu: z.string(),
  areaDescriptionTranslit: z.string(),
  index1: z.string(),
  index2: z.string(),
  indexCOATSU1: z.string(),
  delivery1: z.string(),
  delivery2: z.string(),
  delivery3: z.string(),
  delivery4: z.string(),
  delivery5: z.string(),
  delivery6: z.string(),
  delivery7: z.string(),
  specialCashCheck: z.number(),
  radiusHomeDelivery: z.string(),
  radiusExpressPickUp: z.string(),
  radiusDrop: z.string(),
  warehouse: z.string(),
});

// NOTE: Main
export const settlementSchema = z.object({
  id: z.string(),
  ...settlementBaseSchema.shape,
});

// NOTE: UI
export const settleToSelectSchema = z.object({
  value: z.string(),
  area: z.string(),
  region: z.string(),
  label: z.string(),
});
