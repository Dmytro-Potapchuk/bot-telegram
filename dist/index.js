"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Bot_1 = require("./Components/Bot/Bot");
const node_cron_1 = __importDefault(require("node-cron"));
dotenv_1.default.config();
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Bot_1.Bot({ token: TOKEN, timezone: 'Europe/Warsaw' });
node_cron_1.default.schedule('30 7 * * *', async () => {
    const weather = await bot.getWeather();
    await bot.sendWeather(weather);
});
bot.start();
