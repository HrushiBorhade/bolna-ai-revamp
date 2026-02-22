/**
 * Typesafe localStorage wrapper.
 *
 * Add new keys to `StorageSchema` — every call site is then
 * type-checked against the schema at compile time.
 */

type StorageSchema = {
  "sidebar-open": boolean
}

type StorageKey = keyof StorageSchema

export function getStorageItem<K extends StorageKey>(
  key: K
): StorageSchema[K] | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? null : (JSON.parse(raw) as StorageSchema[K])
  } catch {
    return null
  }
}

export function setStorageItem<K extends StorageKey>(
  key: K,
  value: StorageSchema[K]
): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // quota exceeded or unavailable — fail silently
  }
}

export function removeStorageItem<K extends StorageKey>(key: K): void {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(key)
  } catch {
    // unavailable — fail silently
  }
}
