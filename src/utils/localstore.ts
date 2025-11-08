import { JSONValue } from "src/types"

export const getFromStore = (key: string) => {
  return localStorage.getItem(key)
}

export const getJsonFromStore = (key: string) => {
  try {
    return JSON.parse(getFromStore(key) || '')
  } catch {
    return ''
  }
}

export const saveToStore = (key: string, value: string) => {
  localStorage.setItem(key, value);
}

export const saveAsJsonToStore = (key: string, value: JSONValue) => {
  saveToStore(key, JSON.stringify(value));
}
