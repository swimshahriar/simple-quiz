import { LocalStorageKeys } from '@/config/constants';

export const setToLocalStorage = (key: LocalStorageKeys, value: string) => {
  localStorage.setItem(key, value);
};

export const deleteFromLocalStorage = (key: LocalStorageKeys) => {
  localStorage.removeItem(key);
};

export const getFromLocalStorage = (key: LocalStorageKeys) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || null;
  }

  return null;
};
