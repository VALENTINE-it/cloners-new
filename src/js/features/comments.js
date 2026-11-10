import { fetchItem } from '../data/hnApi.js';

export async function fetchCommentTree(kidIds) {
  if (!kidIds || kidIds.length === 0) return [];
  const comments = await Promise.all(kidIds.map(id => fetchItem(id)));
  const validComments = comments.filter(c => c && !c.deleted);
  // Order newest to oldest
  validComments.sort((a, b) => b.time - a.time);
  return validComments;
}
