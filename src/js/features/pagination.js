import { store } from '../state/store.js';
import { PAGE_SIZE } from '../config/constants.js';

export function getVisibleSlice() {
  const state = store.getState();
  const sliceIds = state.feedIds.slice(0, state.visibleCount);
  return sliceIds;
}

export function loadMore() {
  const state = store.getState();
  const nextCount = state.visibleCount + PAGE_SIZE;
  store.setState({ visibleCount: nextCount });
}
