"use server";
import { Stats, promises as fs } from "fs";
import path from "path";

export class FileSystemUtils {
  private static readonly BASE_DIR = process.cwd();

  static getLogFilePath(directory: string, filename: string): string {
    const sanitizedDir = path
      .normalize(directory)
      .replace(/^(\.\.(\/|\\|$))+/, "");
    const sanitizedFilename = path
      .normalize(filename)
      .replace(/^(\.\.(\/|\\|$))+/, "");

    const safeFilename = path.basename(sanitizedFilename);
    const safeDir = path.dirname(sanitizedDir);

    return path.join(this.BASE_DIR, safeDir, safeFilename);
  }

  static async getFileStats(filepath: string): Promise<Stats> {
    return await fs.stat(filepath);
  }

  static async ensureDirectory(directory: string): Promise<void> {
    const fullPath = path.join(this.BASE_DIR, directory);
    try {
      await fs.access(fullPath);
    } catch {
      await fs.mkdir(fullPath, { recursive: true });
    }
  }

  static async writeEmptyFile(filepath: string): Promise<void> {
    await fs.writeFile(filepath, "");
  }

  static async renameFile(oldPath: string, newPath: string): Promise<void> {
    await fs.rename(oldPath, newPath);
  }

  static async checkFileExists(filepath: string): Promise<boolean> {
    try {
      await fs.access(filepath);
      return true;
    } catch {
      return false;
    }
  }
}
