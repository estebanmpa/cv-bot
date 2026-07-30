# cv-bot — an interactive, AI-powered CV

**cv-bot** turns a resume into a conversation. Instead of a static PDF, recruiters and visitors can chat directly with an AI assistant that knows my professional background — on a web page, on WhatsApp, or on Telegram — and get a real, contextual answer.

<!-- 🔗 Live demo: add your deployed URL here -->

## What it does

- **Ask it anything about my profile.** The assistant is grounded in a system prompt describing my experience, skills, and background, and answers recruiter-style questions ("what's his experience with X?", "tell me about his background") directly and concisely.
- **Same bot, three channels.** The web chat widget, the WhatsApp number, and the Telegram bot all talk to the same backend and the same assistant — pick whichever is convenient.
- **Remembers the conversation.** Each conversation (identified by phone number / chat ID) keeps a short rolling history in Redis, so follow-up questions have context, without keeping it forever.
- **Multilingual.** The assistant detects the language you write in and replies in that language.

## Why I built it

A PDF resume is read once and forgotten. This is a small product that demonstrates, hands-on, the kind of work I actually do:

- Integrating a large language model (Anthropic Claude) into a real application, with a tuned system prompt and per-conversation memory.
- Building and wiring webhook-based integrations with third-party messaging platforms (Meta's WhatsApp Cloud API, Telegram Bot API).
- A typed, modular backend (NestJS) and a modern, responsive frontend (React + Vite + Mantine).
- Shipping it: Dockerized services, and CI/CD that deploys only the parts of the monorepo that changed.

## How it works

```
                        ┌──────────────────────────┐
   Web chat widget ───▶ │                          │
                        │   backend (NestJS API)   │──▶ Anthropic Claude
   WhatsApp webhook ──▶ │                          │       (chat completion)
                        │  - Chat / webhook routes │
   Telegram webhook ──▶ │  - Conversation history  │──▶ Redis
                        │                          │     (24h TTL, per chat)
                        └──────────────────────────┘
```

1. A message arrives — either typed into the web widget, sent to the WhatsApp number, or sent to the Telegram bot.
2. The backend loads that conversation's recent history from Redis, appends the new message, and sends the full context to Claude along with a system prompt describing my professional profile.
3. Claude's reply is sent back on the same channel it came from, and the updated history is saved back to Redis.

## Tech stack

**Frontend (`www/`)** — React 18 + TypeScript, Vite, [Mantine v7](https://mantine.dev/) for UI, [TanStack Router](https://tanstack.com/router) and [TanStack Query](https://tanstack.com/query), React Hook Form + Zod for forms.

**Backend (`backend/`)** — NestJS + TypeScript, [Anthropic SDK](https://www.npmjs.com/package/@anthropic-ai/sdk) (Claude), Redis (`ioredis`) for conversation history, Meta WhatsApp Cloud API and Telegram Bot API integrations.

**Infra** — Docker & Docker Compose for local dev and production, GitHub Actions for CI/CD (deploys only the services whose files changed on push to `main`).

## Project structure

```
.
├── backend/                 NestJS API: Claude integration, WhatsApp & Telegram
│                             webhooks, chat endpoint, Redis-backed history
├── www/                      React frontend: chat widget + WhatsApp/Telegram QR codes
├── docker-compose.yml        Local development stack
├── docker-compose.prod.yml   Production stack
└── .github/workflows/        CI/CD — path-filtered deploys per service
```

## Running it locally

Each app has its own env file and its own README with more detail (see [`backend/README.md`](backend/README.md)).

```bash
# Backend
cd backend
cp .env.example .env   # fill in ANTHROPIC_API_KEY, WhatsApp/Telegram tokens, Redis host, etc.
yarn install
yarn start:dev

# Frontend
cd www
cp .env.example .env   # fill in the backend URL and your WhatsApp/Telegram/social links
yarn install
yarn dev
```

Or, with Docker Compose, from the repo root:

```bash
docker compose up --build -d
```

A local Redis instance is required for conversation history (`docker run -p 6379:6379 redis` works for development).

## About me

Systems Analyst and Fullstack Developer with a strong backend focus. Feel free to try the assistant above, or reach out directly on LinkedIn/GitHub.
