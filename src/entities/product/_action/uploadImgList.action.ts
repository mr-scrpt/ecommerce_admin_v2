"use server";
import { storageFile } from "@/shared/lib/storageFile";
import { z } from "zod";
import { PRODUCT_LIST_FILE_KEY } from "../_constant/formData.contstant";
import { BadRequestError } from "@/kernel/error/errors/error.common";
import { ERROR_APP_LAYER } from "@/shared/error/type";

const resultSchema = z.object({
  imgList: z.object({
    path: z.array(z.string()),
  }),
});

export const uploadImgListAction = async (formData: FormData) => {
  const files = formData.getAll(PRODUCT_LIST_FILE_KEY);

  const fileListUploaded = [];
  for (const file of files) {
    if (!(file instanceof File)) {
      throw new BadRequestError({ layer: ERROR_APP_LAYER.SERVICE });
    }
    const storedFile = await storageFile.uploadImage(file, "avatar");
    fileListUploaded.push(storedFile);
  }

  return resultSchema.parse({
    imgList: {
      path: fileListUploaded.map((item) => item.path),
    },
  });
};
