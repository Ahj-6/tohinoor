# Tohinoor Admin

React + Vite + AdminLTE 4 RTL starter for the Tohinoor control panel.

## Run

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` and set the Laravel API URL.

## Current state

- AdminLTE RTL shell is integrated.
- React Router is configured.
- Sidebar and dashboard shell are present.
- Axios service is prepared for Sanctum Bearer tokens.
- Authentication and role authorization are intentionally not implemented yet.

## Planned next step

Connect `/api/login`, `/api/me`, and `/api/logout`, then add Admin / Operator guards before building CRUD screens.
