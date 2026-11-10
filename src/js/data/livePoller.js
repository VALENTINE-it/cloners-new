import { fetchFeedIds, fetchItem } from './hnApi.js';
import { store } from '../state/store.js';
import { LIVE_POLL_INTERVAL } from '../config/constants.js';

export function initLivePoller(onNewItems) {
  setInterval(async () => {
    const state = store.getState();
    const ids = await fetchFeedIds(state.activeFeed);
    if (ids && ids.length > 0) {
      const latestId = ids[0];
      if (!store.getItem(latestId)) {
        const newItem = await fetchItem(latestId);
        if (newItem) {
          onNewItems(newItem);
        }
      }
    }
  }, LIVE_POLL_INTERVAL);
}
