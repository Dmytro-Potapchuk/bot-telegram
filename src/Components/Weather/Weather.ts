import axios from 'axios';

export interface WeatherData {
    city: string; // Назва міста
    temperature: number; // Температура у градусах Цельсія
    description: string;  // Опис погоди
}

export class Weather {
    private readonly apiKey: string; // Ключ API
    private readonly city: string; // Назва міста


    constructor(timezone: string) {
        this.apiKey = process.env.WEATHER_API_KEY; // API ключ для доступу до погодних даних
        this.city = timezone; // Назва міста для отримання погоди
    }

    public async getWeather(): Promise<WeatherData> {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric&lang=ua`; // URL для отримання погодних даних
        const response = await axios.get(url); // Виконуємо запит до API та отримуємо відповідь

        if (!response.data || !response.data.name || !response.data.main || !response.data.main.temp || !response.data.weather || !response.data.weather[0].description) {
            throw new Error('Could not find weather data for specified city.');  // Викидаємо помилку у разі невдачі отримання даних
        }
        // Повертаємо об'єкт з необхідними погодними даними
        return {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
        };
    }
}
