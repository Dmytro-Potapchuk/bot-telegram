import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        units: 'metric',
        lang: 'ua',
        appid: process.env.WEATHER_API_KEY,
    },
});

export default axiosInstance;