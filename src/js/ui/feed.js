import { timeAgo } from '../utils/time.js';

export function renderPostCard(item) {
  const card = document.createElement('div');
  card.className = 'post-card';
  card.dataset.id = item.id;

  const typeBadge = `<span class="type-badge ${item.type}">${item.type}</span>`;
  const domain = item.url ? new URL(item.url).hostname.replace('www.', '') : '';

  card.innerHTML = `
    <div class="post-header">
      ${typeBadge}
      <a href="${item.url}" target="_blank" class="post-title">${item.title || item.text.substring(0, 60)}</a>
    </div>
    <div class="post-meta">
      <span>${item.score} points</span>
      <span>by ${item.by}</span>
      <span>${timeAgo(item.time)}</span>
      ${domain ? `<span>(${domain})</span>` : ''}
      <a href="#" class="comments-link" data-id="${item.id}">${item.kids.length} comments</a>
    </div>
  `;
  return card;
}
