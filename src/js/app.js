import { store } from './state/store.js';
import { initUrlSync } from './state/urlSync.js';
import { fetchFeedIds } from './data/hnApi.js';
import { renderApp } from './ui/render.js';
import { loadMore } from './features/pagination.js';
import { initLivePoller } from './data/livePoller.js';
import { renderLiveBanner, clearLiveBanner } from './ui/liveBanner.js';

async function init() {
  initUrlSync();

  store.subscribe(async () => {
    await renderApp();
  });

  // Nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const feedType = e.target.dataset.feed;
      const ids = await fetchFeedIds(feedType);
      store.setState({ activeFeed: feedType, feedIds: ids, visibleCount: 15 });
    });
  });

  // Load more button
  document.getElementById('load-more-btn').addEventListener('click', () => {
    loadMore();
    renderApp();
  });

  // Initial load
  const state = store.getState();
  const ids = await fetchFeedIds(state.activeFeed);
  store.setState({ feedIds: ids });

  // Live poller
  initLivePoller((newItem) => {
    renderLiveBanner(newItem, async () => {
      clearLiveBanner();
      const ids = await fetchFeedIds(store.getState().activeFeed);
      store.setState({ feedIds: ids });
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
