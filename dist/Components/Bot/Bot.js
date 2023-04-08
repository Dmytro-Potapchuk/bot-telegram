"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const Weather_1 = require("../Weather/Weather");
class Bot {
    constructor(options) {
        this.bot = new node_telegram_bot_api_1.default(options.token, { polling: true });
        this.weather = new Weather_1.Weather(options.timezone);
        this.chatId = undefined;
        this.bot.on('message', this.handleMessage.bind(this));
    }
    start() {
        console.log('Bot started!');
        this.sendMessage('Bot has been started!');
    }
    async getWeather() {
        return await this.weather.getWeather();
    }
    async sendWeather(weatherData) {
        const response = `The current temperature in ${weatherData.city} is ${weatherData.temperature}°C, ${weatherData.description}.`;
        this.sendMessage(response);
    }
    async handleMessage(message) {
        if (message.text?.toLowerCase() === '/weather') {
            try {
                const weatherData = await this.weather.getWeather();
                const response = `The current temperature in ${weatherData.city} is ${weatherData.temperature}°C, ${weatherData.description}.`;
                this.sendMessage(response);
            }
            catch (err) {
                console.error(err);
                this.sendMessage('Sorry, there was an error getting the weather.');
            }
        }
        else if (message.text?.toLowerCase() === '/subscribe') {
            this.chatId = message.chat.id;
            this.sendMessage('You have subscribed to daily weather updates!');
        }
        else if (message.text?.toLowerCase() === '/unsubscribe') {
            this.chatId = undefined;
            this.sendMessage('You have unsubscribed from daily weather updates!');
        }
    }
    sendMessage(text) {
        if (this.chatId !== undefined) {
            this.bot.sendMessage(this.chatId, text).then(r => r);
        }
    }
}
exports.Bot = Bot;
