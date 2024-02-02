import { FILE_SIZE_IMG_SIZE_MEDIUM } from "../config/file.config";

export function selectFile(
  contentType: string,
  multiple: true,
): Promise<File[]>;

export function selectFile(contentType: string): Promise<File>;

export function selectFile(contentType: string, multiple?: boolean) {
  return new Promise((resolve) => {
    let input = document.createElement("input");
    input.type = "file";
    input.multiple = multiple ?? false;
    input.accept = contentType;

    input.onchange = () => {
      let files = Array.from(input.files as Iterable<File>);
      if (multiple) resolve(files);
      else resolve(files[0]);
    };

    input.click();
  });
}

export const validateImgSizeMedium = (file: File) =>
  validateFileSize(file, FILE_SIZE_IMG_SIZE_MEDIUM);

const validateFileSize = (file: File, sizeMb: number) => {
  const fileSize = file.size / 1024 / 1024; // in MiB
  if (fileSize > sizeMb) {
    return false;
  } else {
    return true;
  }
};
