export class SessionStorage {
  static setItem(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(key, value);
      } catch (e) {
        console.error('Error saving to sessionStorage', e);
      }
    }
  }

  static getItem(key: string): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  static removeItem(key: string): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  }

  static clear(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  }
}
