import {
  PostDefaultSelectOption,
  postDefaultSelectOptionSchema,
} from "@/kernel/domain/post/form.schema";
import { PostOffice } from "@/kernel/domain/post/post.type";
import { filterNullValues } from "@/shared/lib/filter";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const postFormDefaultSchema = z.object({
  postOfficeList: z.array(postDefaultSelectOptionSchema).optional(),
});

export type PostFormDefaultValues<
  T extends z.ZodTypeAny = typeof postFormDefaultSchema,
> = z.infer<T>;

export const postDefaultFieldsValues: PostFormDefaultValues = {
  postOfficeList: [],
};

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
