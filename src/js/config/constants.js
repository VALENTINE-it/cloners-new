export const API_BASE = 'https://hacker-news.firebaseio.com/v0';
export const ENDPOINTS = {
  top: `${API_BASE}/topstories.json`,
  new: `${API_BASE}/newstories.json`,
  best: `${API_BASE}/beststories.json`,
  job: `${API_BASE}/jobstories.json`,
  item: (id) => `${API_BASE}/item/${id}.json`
};
export const PAGE_SIZE = 15;
export const LIVE_POLL_INTERVAL = 5000;
