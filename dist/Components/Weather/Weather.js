"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weather = void 0;
const axios_1 = __importDefault(require("axios"));
class Weather {
    constructor(timezone) {
        this.apiKey = 'd1e6e055eac0e5ed7a1bb5e735e34b5c';
        this.city = timezone;
    }
    async getWeather() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
        const response = await axios_1.default.get(url);
        if (!response.data || !response.data.name || !response.data.main || !response.data.main.temp || !response.data.weather || !response.data.weather[0].description) {
            throw new Error('Could not find weather data for specified city.');
        }
        return {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
        };
    }
}
exports.Weather = Weather;
