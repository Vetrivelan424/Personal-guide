# LifeOS (Monolithic Web App)

LifeOS is a monolithic Next.js application for individual financial and life planning in India.

## What this MVP covers

- Expense upload (CSV), tracking, and category visualization
- Monthly expense trend and overspending visibility
- Debt management view with payoff acceleration simulation
- Goal planning with progress and required monthly contribution
- AI-powered monthly insight and daily routine guidance
- Investment readiness + low/medium-risk allocation suggestions

## Monolithic architecture

- `app/page.tsx`: UI dashboard and feature composition
- `app/api/analyze`: AI insight endpoint (`GET` and payload-based `POST`)
- `app/api/transactions`: statement parsing endpoint (CSV parser)
- `lib/*`: domain models, mock data, and planning/AI helper logic

## Tech stack (MVP)

- Next.js (App Router, API routes)
- TypeScript
- Recharts

## Local run

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`.

## API examples

### Monthly insight

```bash
curl http://localhost:3000/api/analyze
```

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H 'content-type: application/json' \
  -d '{"income":85000,"transactions":[{"id":"1","date":"2026-02-01","description":"Rent","category":"Needs","amount":19000}]}'
```

### Statement parsing

`POST /api/transactions` with multipart form-data key: `statement`.

## Next production steps

- PostgreSQL persistence (transactions, goals, debt schedules, insight logs)
- JWT authentication and protected APIs
- PDF statement parsing pipeline and rule engine for categorization
- Gemini + Ollama provider layer with scheduler for daily guidance
- Encryption, consent capture, and compliance audit logs
