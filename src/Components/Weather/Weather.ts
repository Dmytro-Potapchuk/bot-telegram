import axios from 'axios';

export interface WeatherData {
    city: string;
    temperature: number;
    description: string;
}

export class Weather {
    private apiKey: string;
    private city: string;

    constructor(timezone: string) {
        this.apiKey = 'd1e6e055eac0e5ed7a1bb5e735e34b5c';
        this.city = timezone;
    }

    public async getWeather(): Promise<WeatherData> {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
        const response = await axios.get(url);

        if (!response.data || !response.data.name || !response.data.main || !response.data.main.temp || !response.data.weather || !response.data.weather[0].description) {
            throw new Error('Could not find weather data for specified city.');
        }

        const weatherData: WeatherData = {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
        };

        return weatherData;
    }

}
