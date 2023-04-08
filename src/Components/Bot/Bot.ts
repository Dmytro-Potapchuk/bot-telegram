import TelegramBot from 'node-telegram-bot-api';
import {
    Weather,
    WeatherData
} from '../Weather/Weather';

// Опис інтерфейсу для параметрів бота
interface BotOptions {
    token: string; // Токен бота
    timezone: string; // Часовий пояс, що використовується для отримання погоди
}


export class Bot {
    private bot: TelegramBot; // Об'єкт телеграм-бота
    private weather: Weather; // Об'єкт, що дозволяє отримувати погоду
    private chatId: number | undefined; // ID чату з користувачем, який підписався на повідомлення з погодою

    constructor(options: BotOptions) {
        this.bot = new TelegramBot(options.token, { polling: true }); // Ініціалізація телеграм-бота з використанням токену
        this.weather = new Weather(options.timezone); // Ініціалізація об'єкта, що дозволяє отримувати погоду
        this.chatId = undefined; // Початкове значення ID чату


        // Встановлення обробника події "message"
        this.bot.on('message', this.handleMessage.bind(this));
    }

    // Метод запуску бота
    public start(): void {
        console.log('Bot started!');
        this.sendMessage('Bot has been started!');

    }

    // Метод отримання погоди
    async getWeather(): Promise<WeatherData> {
        return await this.weather.getWeather();
    }

    async sendWeather(weatherData: WeatherData): Promise<void> {
        const response = `The current temperature in ${weatherData.city} is ${weatherData.temperature}°C, ${weatherData.description}.`;
        this.sendMessage(response);
    }

    // Обробник події "message"
    private async handleMessage(message: TelegramBot.Message): Promise<void> {
        if (message.text?.toLowerCase() === '/погода') {   // Якщо користувач надіслав "/weather"
            try {
                const weatherData = await this.weather.getWeather();  // Отримати погоду
                const response = `Поточна температура в ${weatherData.city} є ${weatherData.temperature}°C, ${weatherData.description}.`;
                this.sendMessage(response);  // Відправити повідомлення з погодою
            } catch (err) {
                console.error(err);
                this.sendMessage('На жаль, сталася помилка отримання прогнозу погоди.'); // Відправити повідомлення про помилку
            }
        } else if (message.text?.toLowerCase() === '/підписка') {  // Якщо користувач надіслав "/subscribe"
            this.chatId = message.chat.id; // збереження ID чату
            this.sendMessage('Ви підписалися на щоденні оновлення погоди!'); // відправлення підтвердження про підписку на оновлення погоди
        } else if (message.text?.toLowerCase() === '/unsubscribe') { // Якщо користувач надіслав "/unsubscribe"
            this.chatId = undefined; // знищення ID чату
            this.sendMessage('Ви скасували підписку на щоденні оновлення погоди!'); // відправлення підтвердження про відписку від оновлень погоди
        }
    }

    sendMessage(text: string): void {
        // Перевірка, чи існує ID чату
        if (this.chatId !== undefined) {
            // Відправка повідомлення за допомогою телеграм-бота
            this.bot.sendMessage(this.chatId, text);
        }
    }
}
