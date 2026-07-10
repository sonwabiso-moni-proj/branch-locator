# Capitec Branch Locator

A React web application that lets users find Capitec Bank branches and ATMs across South Africa. Users can search by name or location, filter by facility or service type, and view results on an interactive map alongside a scrollable branch list.

## Features

- **Interactive map** — powered by Leaflet with marker clustering for dense areas
- **Search** — filter branches by name, suburb, city, or province
- **Filter tabs** — quickly narrow results by ATM, Cash Accepting ATM, Smart ID Services, or Business Banking Centre
- **"Near me" location** — uses the browser Geolocation API to find the closest branches sorted by distance
- **Branch list** — scrollable sidebar with open/closed status and ratings
- **Mock API** — built-in MSW (Mock Service Worker) mock so the app runs fully offline without a real backend

## Tech stack

| Layer | Library |
|---|---|
| UI framework | React 19 |
| Build tool | Vite 8 |
| Map | react-leaflet + leaflet.markercluster |
| Icons | react-icons, @heroicons/react |
| Mock API | MSW 2 |
| Linting | ESLint 10 |

## Project structure

```
src/
├── api/
│   ├── BranchApiService.js        # API client (getBranches, getBranchById, searchNearby)
│   ├── constants/api-paths.js     # API route constants
│   ├── schemas/                   # Zod-style request/response schemas
│   └── service/
│       ├── base/http-Service.js   # Base fetch wrapper with validation
│       └── mock/
│           └── branchLocatorService.js  # MSW handlers + 60 mock branches
├── components/
│   ├── branchList/                # Scrollable branch results sidebar
│   ├── branchMap/                 # Leaflet map with clustered markers
│   ├── header/                    # Search bar, filter tabs, location button
│   └── locationButton/            # "Near me" geolocation trigger
├── config/env.js                  # Feature flags (USE_MOCK_SERVICE)
├── App.jsx                        # Root component — state & data fetching
└── main.jsx                       # Entry point — MSW bootstrap
```

## Getting started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Install dependencies

```bash
npm install
```

### Run in development mode

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. The app starts with `USE_MOCK_SERVICE = true` in `src/config/env.js`, so no backend is needed — MSW intercepts all API calls and returns generated mock data.

### Build for production

```bash
npm run build
```

The output is written to `dist/`.

### Preview the production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Docker

### Build the image

```bash
docker build -t branch-locator .
```

### Run the container

```bash
docker run -p 8080:80 branch-locator
```

Open `http://localhost:8080`. The image uses a two-stage build — Node 20 Alpine compiles the Vite bundle, then Nginx Alpine serves the static files. The Nginx config includes an SPA fallback so page reloads on any route return `index.html`.

---

## Switching to a real APIw

1. Open `src/config/env.js` and set `USE_MOCK_SERVICE` to `false`:

```js
export const USE_MOCK_SERVICE = false;
```

2. Ensure your backend exposes the following endpoints:

| Method | Path | Description |
|---|---|---|
| GET | `/v1/branches` | List/search branches (supports `search`, `province`, `facility`, `service`, `page`, `pageSize` query params) |
| GET | `/v1/branches/:branchId` | Get a single branch by ID |
| POST | `/v1/branches/search` | Find nearest branches by coordinates (`{ coordinates: { latitude, longitude } }`) |

## Mock API

The mock is powered by [MSW](https://mswjs.io/) and runs entirely in the browser via a Service Worker. It includes 60 branches spread across all 9 South African provinces with realistic data (operating hours, facilities, services, busy times, ratings).

To simulate API errors during development, append `?simulateError=400`, `?simulateError=500`, or `?simulateError=404` to any request URL.
