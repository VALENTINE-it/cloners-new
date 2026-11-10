import { ENDPOINTS } from '../config/constants.js';
import { normalizeItem } from './normalizeItem.js';
import { store } from '../state/store.js';

export async function fetchFeedIds(feedType) {
  const url = ENDPOINTS[feedType] || ENDPOINTS.top;
  const res = await fetch(url);
  const ids = await res.json();
  return ids || [];
}

export async function fetchItem(id) {
  if (store.getItem(id)) return store.getItem(id);
  try {
    const res = await fetch(ENDPOINTS.item(id));
    const raw = await res.json();
    const normalized = normalizeItem(raw);
    if (normalized) {
      store.cacheItem(id, normalized);
    }
    return normalized;
  } catch (err) {
    console.error(`Failed to fetch item ${id}:`, err);
    return null;
  }
}

export async function fetchItemsBatch(ids) {
  return Promise.all(ids.map(id => fetchItem(id)));
}
