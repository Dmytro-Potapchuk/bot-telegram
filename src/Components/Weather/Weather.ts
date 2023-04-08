
import axiosInstance from "../../config/config";

export interface WeatherData {
    city: string; // Назва міста
    temperature: number; // Температура у градусах Цельсія
    description: string;  // Опис погоди
}

export class Weather {

    private readonly city: string; // Назва міста


    constructor(timezone: string) {

        this.city = timezone; // Назва міста для отримання погоди
    }

    public async getWeather(): Promise<WeatherData> {
        const url = `/weather?q=${this.city}`;
        const response = await axiosInstance.get(url);

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
