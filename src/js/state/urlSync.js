import { store } from './store.js';

export function initUrlSync() {
  const params = new URLSearchParams(window.location.search);
  const feed = params.get('feed');
  if (feed) {
    store.setState({ activeFeed: feed });
  }

  store.subscribe((state) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('feed', state.activeFeed);
    window.history.replaceState({}, '', `${window.location.pathname}?${newParams.toString()}`);
  });
}
