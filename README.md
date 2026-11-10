# cloners-new

.
├── index.html                    # Markup & accessible control layouts
├── README.md                     # Team guide, architecture breakdown & audit manual
└── src/
    ├── styles/
    │   ├── main.css              # Stylesheet entrypoint (@imports below, in order)
    │   ├── tokens.css            # Design tokens: colors, fonts, radii
    │   ├── base.css              # Reset, page shell, typography
    │   ├── layout.css            # Header, control panel grid, live badge bar, post feed frame
    │   ├── components.css        # Post cards, type badges, comments tree, pagination
    │   └── modal.css             # Discussion modal & comment viewer layout
    └── js/
        ├── app.js                # Bootstrap: fetch, listeners, first paint, live polling loop
        ├── config/
        │   └── constants.js      # API base URL, endpoints (new/top/best/job stories), cache TTL
        ├── state/
        │   ├── store.js          # Central state object + mutators (items cache, feeds, live queue)
        │   └── urlSync.js        # URLSearchParams ↔ state persistence for active feed/post modal
        ├── utils/
        │   ├── debounce.js       # Debounce and throttle utilities for scroll & visibility events
        │   └── time.js           # Relative time formatting and newest-to-oldest sorting helpers
        ├── data/
        │   ├── hnApi.js          # Fetch client for Hacker News Firebase REST API with caching & batching
        │   ├── normalizeItem.js  # Raw API item record → flat story/job/poll/comment model
        │   └── livePoller.js     # 5-second polling service for live updates detection & user notification
        ├── features/
        │   ├── pagination.js     # Progressive loading, chunk slicing, and intersection observer binding
        │   └── comments.js       # Comment tree resolution, parent association, and nested collapsible expansion
        └── ui/
            ├── render.js         # Repaints dynamic regions and live update banners
            ├── feed.js           # Post cards (stories, jobs, polls) with type badges and scores
            ├── comments.js       # Comment tree DOM generation with collapse/expand toggles
            ├── liveBanner.js     # Live data notification banner & merge action
            └── controls.js       # Feed tabs, filters, and progressive load triggers

            
