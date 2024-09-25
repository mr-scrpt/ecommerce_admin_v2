import { z } from "zod";
import { PostOffice } from "./post.type";
import { filterNullValues } from "@/shared/lib/filter";

// NOTE: Select Post Option
export const postDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  active: z.boolean().optional(),
});

export type PostDefaultSelectOption = z.infer<
  typeof postDefaultSelectOptionSchema
>;

export const postOfficeDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  active: z.boolean().optional(),
});

export type PostOfficeDefaultSelectOption = z.infer<
  typeof postOfficeDefaultSelectOptionSchema
>;

// NOTE: Build Post Office Option
export const buildPostOfficeOption = (
  postOffice?: PostOffice | null,
): PostDefaultSelectOption | null =>
  postOffice
    ? {
        value: postOffice.ref,
        label: postOffice.description,
      }
    : null;

export const buildPostOfficeOptionsArray = (
  postOffice?: Array<PostOffice | null | undefined> | null,
): PostDefaultSelectOption[] =>
  postOffice ? filterNullValues(postOffice.map(buildPostOfficeOption)) : [];
