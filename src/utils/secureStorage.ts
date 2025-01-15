import * as SecureStore from 'expo-secure-store';

interface StorageOptions {
  keychainAccessible?: SecureStore.KeychainAccessibilityConstant;
}

const defaultOptions: StorageOptions = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED,
};

class SecureStorageError extends Error {
  constructor(message: string, public readonly key?: string) {
    super(message);
    this.name = 'SecureStorageError';
  }
}

export const secureStorage = {
  /**
   * Store a value securely
   * @throws {SecureStorageError} If the value cannot be stored
   */
  async set<T>(key: string, value: T, options?: StorageOptions): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await SecureStore.setItemAsync(key, serializedValue, {
        ...defaultOptions,
        ...options,
      });
    } catch (error) {
      throw new SecureStorageError(
        `Failed to store value for key: ${key}`,
        key
      );
    }
  },

  /**
   * Retrieve a value from secure storage
   * @throws {SecureStorageError} If the value cannot be retrieved
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await SecureStore.getItemAsync(key);
      if (value === null) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      throw new SecureStorageError(
        `Failed to retrieve value for key: ${key}`,
        key
      );
    }
  },

  /**
   * Delete a value from secure storage
   * @throws {SecureStorageError} If the value cannot be deleted
   */
  async remove(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      throw new SecureStorageError(
        `Failed to delete value for key: ${key}`,
        key
      );
    }
  },

  /**
   * Check if a key exists in secure storage
   */
  async has(key: string): Promise<boolean> {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value !== null;
    } catch {
      return false;
    }
  },
};
