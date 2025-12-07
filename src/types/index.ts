export type JSONValue = string | number | boolean | null | { [key: string]: JSONValue } | JSONValue[];

export type MakeOptional<T, K extends keyof T> =
  Omit<T, K> & Partial<Pick<T, K>>;

