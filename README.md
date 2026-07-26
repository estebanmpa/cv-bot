# cv-bot

A NestJS chatbot backend that receives WhatsApp messages and uses Claude to generate responses.

## Installation

```bash
yarn install
```

## Run in development

```bash
cp .env.example .env
# fill in the environment variables in .env
yarn start:dev
```

## Run with Docker Compose

### Development

```bash
docker compose up --build -d
```

### Production

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

## Test the endpoint

```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, can you introduce yourself?"}'
```
