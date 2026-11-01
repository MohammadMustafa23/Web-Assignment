# Cynbit Careers Website

A responsive React and Vite website for Cynbit, including careers listings and a multi-step application flow with local draft recovery.

## Run locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Career application API

The form sends a `POST` request to `/api/career-applications` by default. Configure either environment variable when connecting a backend:

```bash
VITE_API_URL=https://api.example.com
# or
VITE_CAREER_APPLICATION_API_URL=https://api.example.com/api/career-applications
```

Drafts are saved only in the applicant's browser for up to 30 days.
