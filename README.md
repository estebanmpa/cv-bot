# cv-bot

Base de chatbot NestJS con un endpoint POST `/chat` que usa Claude para generar respuestas.

## Instalación

```bash
yarn install
```

## Ejecutar en desarrollo

```bash
cp .env.example .env
# completar ANTHROPIC_API_KEY en .env
yarn start:dev
```

## Probar el endpoint

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hola, ¿puedes presentarte?"}'
```
