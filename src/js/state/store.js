class Store {
  constructor() {
    this.state = {
      activeFeed: 'top',
      feedIds: [],
      visibleCount: 15,
      itemsCache: new Map(),
      liveQueue: [],
      currentModalItem: null
    };
  }

  getState() {
    return this.state;
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    if (this.listener) this.listener(this.state);
  }

  subscribe(listener) {
    this.listener = listener;
  }

  cacheItem(id, item) {
    this.state.itemsCache.set(id, item);
  }

  getItem(id) {
    return this.state.itemsCache.get(id);
  }
}

export const store = new Store();
