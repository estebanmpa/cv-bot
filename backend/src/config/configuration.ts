export default () => ({
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || '0.0.0.0',
    cors: {
        origins: (process.env.CORS_ORIGINS || '').split(',').map((origin) => origin.trim()),
    },
    cache: {
        url: process.env.REDIS_URL,
    },
    anthropic: {
        apiKey: process.env.ANTHROPIC_API_KEY,
        model: process.env.ANTHROPIC_MODEL,
    },
    whatsapp: {
        accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
        phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
        webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
    },
    telegram: {
        botToken: process.env.TELEGRAM_BOT_TOKEN,
    },
});
