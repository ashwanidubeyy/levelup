import AsyncStorage from '@react-native-async-storage/async-storage';

const readJson = <T>(key: string): Promise<T | null> =>
  AsyncStorage.getItem(key)
    .then((raw: string | null) => (raw ? (JSON.parse(raw) as T) : null))
    .catch(() => null);

const writeJson = (key: string, value: unknown): Promise<boolean> =>
  AsyncStorage.setItem(key, JSON.stringify(value))
    .then(() => true)
    .catch(() => false);

const storageService = { readJson, writeJson };

export default storageService;
