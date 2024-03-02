"use client";
interface StorageCustomType {
  setItem(key: string, value: any): void;
  getItem(key: string): any;
  removeItem(key: string): void;
}

class StoregeFabric implements StorageCustomType {
  private storage: Storage;

  private key: string;

  constructor(storage: Storage, key: string) {
    this.storage = storage;
    this.key = key;
  }

  setItem(value: any): void {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  getItem(): any {
    const item = this.storage.getItem(this.key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(): void {
    this.storage.removeItem(this.key);
  }
}

export const storage = (key: string) => new StoregeFabric(localStorage, key);
