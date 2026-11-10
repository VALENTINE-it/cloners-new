import { fetchCommentTree } from '../features/comments.js';
import { timeAgo } from '../utils/time.js';

export async function renderCommentTree(kidIds, container) {
  container.innerHTML = '<p>Loading comments...</p>';
  const comments = await fetchCommentTree(kidIds);
  if (comments.length === 0) {
    container.innerHTML = '<p>No comments yet.</p>';
    return;
  }
  container.innerHTML = '';
  for (const comment of comments) {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `
      <div class="comment-meta">by ${comment.by} • ${timeAgo(comment.time)}</div>
      <div class="comment-text">${comment.text}</div>
      <div class="sub-comments" data-parent="${comment.id}"></div>
    `;
    container.appendChild(div);
    if (comment.kids && comment.kids.length > 0) {
      renderCommentTree(comment.kids, div.querySelector('.sub-comments'));
    }
  }
}
