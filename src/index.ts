import dotenv from 'dotenv';
import { Bot } from './Components/Bot/Bot';
import cron from 'node-cron';

dotenv.config();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

const bot = new Bot({ token: TOKEN, timezone: 'Europe/Warsaw' });

// Отримуємо погоду о 7:30 за місцевим часом у Варшаві
cron.schedule('30 7 * * *', async () => {
    const weather = await bot.getWeather();
    await bot.sendWeather(weather);
});

bot.start();