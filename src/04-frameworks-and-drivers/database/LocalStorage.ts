// File: d:\DEV\learning\kiadstarstool-frontend\src\04-frameworks-and-drivers\database\LocalStorage.ts

type Collection<T> = T[];
type DbSchema = Record<string, Collection<any>>;

class LocalStorageDB {
  private db: DbSchema = {};
  private readonly storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
    this.load();
  }

  private load() {
    try {
      const storedData = localStorage.getItem(this.storageKey);
      if (storedData) {
        this.db = JSON.parse(storedData);
      } else {
        this.db = {};
      }
    } catch (e) {
      console.error(`[LocalStorageDB] Failed to load from localStorage key "${this.storageKey}"`, e);
      this.db = {};
    }
  }

  public persist() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.db));
    } catch (e) {
      console.error(`[LocalStorageDB] Failed to persist to localStorage key "${this.storageKey}"`, e);
    }
  }

  public getCollection<T>(name: string): Collection<T> {
    if (!this.db[name]) {
      this.db[name] = [];
    }
    return this.db[name] as Collection<T>;
  }

  public setCollection<T>(name: string, data: Collection<T>) {
    this.db[name] = data;
    this.persist();
  }

  public clear() {
    this.db = {};
    localStorage.removeItem(this.storageKey);
  }
}

// Create a singleton instance for the entire app's mock environment
export const mockDatabase = new LocalStorageDB('app_mock_database_v1');