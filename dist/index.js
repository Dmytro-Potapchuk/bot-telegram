"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Bot_1 = require("./Components/Bot/Bot");
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TIMEZONE = process.env.TIMEZONE;
const bot = new Bot_1.Bot({ token: TOKEN, timezone: TIMEZONE });
node_cron_1.default.schedule('30 7 * * *', async () => {
    const weather = await bot.getWeather();
    await bot.sendWeather(weather);
});
bot.start();
