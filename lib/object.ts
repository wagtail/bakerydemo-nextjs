export function iget<T extends Record<string, unknown>>(obj: T, key: string) {
  const ikey = key.toLowerCase();
  return obj[Object.keys(obj).find((k) => k.toLowerCase() === ikey) as keyof T];
}
