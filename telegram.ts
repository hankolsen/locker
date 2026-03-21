const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const sendTelegramMessage = async (message: string) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_BOT_API_KEY || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram notifications not configured');
    return;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}:${TELEGRAM_BOT_API_KEY}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      },
    );

    if (!response.ok) {
      console.error('Failed to send Telegram message:', response.status, await response.text());
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
};
