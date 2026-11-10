import { store } from '../state/store.js';
import { fetchItemsBatch } from '../data/hnApi.js';
import { getVisibleSlice } from '../features/pagination.js';
import { renderPostCard } from './feed.js';
import { renderCommentTree } from './comments.js';

export async function renderApp() {
  const state = store.getState();
  
  // Update stats
  document.getElementById('stat-feed').textContent = `${state.activeFeed.toUpperCase()} Stories`;
  document.getElementById('stat-count').textContent = state.visibleCount;
  document.getElementById('stat-cache').textContent = `${state.itemsCache.size} items`;

  // Render feed
  const feedContainer = document.getElementById('feed-container');
  feedContainer.innerHTML = '<p>Loading...</p>';

  const visibleIds = getVisibleSlice();
  const items = await fetchItemsBatch(visibleIds);

  feedContainer.innerHTML = '';
  items.filter(Boolean).forEach(item => {
    feedContainer.appendChild(renderPostCard(item));
  });

  // Attach comment triggers
  document.querySelectorAll('.comments-link').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const id = parseInt(link.dataset.id, 10);
      const item = store.getItem(id);
      openModal(item);
    });
  });
}

function openModal(item) {
  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');
  modal.classList.remove('hidden');
  content.innerHTML = `
    <h2>${item.title || 'Details'}</h2>
    <p><strong>${item.score} points</strong> by ${item.by}</p>
    <div id="modal-comments"></div>
  `;
  renderCommentTree(item.kids, document.getElementById('modal-comments'));
}

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal-container').classList.add('hidden');
});
