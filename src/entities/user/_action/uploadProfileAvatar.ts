"use server";
import { BadRequest } from "@/shared/lib/errors";
import { AVATAR_FILE_KEY } from "../_constant/avatar.constant";
import { z } from "zod";
import { storageFile } from "@/shared/lib/storageFile";

const resultSchema = z.object({
  avatar: z.object({
    path: z.string(),
  }),
});

export const uploadProfileAvatarAction = async (formData: FormData) => {
  const file = formData.get(AVATAR_FILE_KEY);

  if (!(file instanceof File)) {
    throw new BadRequest();
  }

  const storedFile = await storageFile.uploadImage(file, "avatar");

  return resultSchema.parse({
    avatar: storedFile,
  });
};
