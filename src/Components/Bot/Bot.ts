import TelegramBot from 'node-telegram-bot-api';
import {
    Weather,
    WeatherData
} from '../Weather/Weather';

interface BotOptions {
    token: string;
    timezone: string;
}

export class Bot {
    private bot: TelegramBot;
    private weather: Weather;
    private chatId: number | undefined;

    constructor(options: BotOptions) {
        this.bot = new TelegramBot(options.token, { polling: true });
        this.weather = new Weather(options.timezone);
        this.chatId = undefined;

        this.bot.on('message', this.handleMessage.bind(this));
    }

    public start(): void {
        console.log('Bot started!');
        this.sendMessage('Bot has been started!');
    }

    async getWeather(): Promise<WeatherData> {
        return await this.weather.getWeather();
    }

    async sendWeather(weatherData: WeatherData): Promise<void> {
        const response = `The current temperature in ${weatherData.city} is ${weatherData.temperature}°C, ${weatherData.description}.`;
        this.sendMessage(response);
    }

    private async handleMessage(message: TelegramBot.Message): Promise<void> {
        if (message.text?.toLowerCase() === '/weather') {
            try {
                const weatherData = await this.weather.getWeather();
                const response = `The current temperature in ${weatherData.city} is ${weatherData.temperature}°C, ${weatherData.description}.`;
                this.sendMessage(response);
            } catch (err) {
                console.error(err);
                this.sendMessage('Sorry, there was an error getting the weather.');
            }
        } else if (message.text?.toLowerCase() === '/subscribe') {
            this.chatId = message.chat.id;
            this.sendMessage('You have subscribed to daily weather updates!');
        } else if (message.text?.toLowerCase() === '/unsubscribe') {
            this.chatId = undefined;
            this.sendMessage('You have unsubscribed from daily weather updates!');
        }
    }

    private sendMessage(text: string): void {
        if (this.chatId !== undefined) {
            this.bot.sendMessage(this.chatId, text);
        }
    }
}
