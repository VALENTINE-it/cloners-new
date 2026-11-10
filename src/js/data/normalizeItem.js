export function normalizeItem(raw) {
  if (!raw) return null;
  let type = 'story';
  if (raw.type === 'job') type = 'job';
  else if (raw.type === 'poll' || raw.parts) type = 'poll';
  else if (raw.type === 'comment') type = 'comment';

  return {
    id: raw.id,
    deleted: raw.deleted || false,
    type,
    by: raw.by || 'anonymous',
    time: raw.time || Date.now() / 1000,
    title: raw.title || '',
    text: raw.text || '',
    url: raw.url || `https://news.ycombinator.com/item?id=${raw.id}`,
    score: raw.score || 0,
    kids: raw.kids || [],
    parts: raw.parts || [],
    parent: raw.parent || null
  };
}
