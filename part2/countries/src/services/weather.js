import axios from "axios";

const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat="
const baseGeoUrl = "http://api.openweathermap.org/geo/1.0/direct?q="
const api_key = process.env.REACT_APP_API_KEY

const getCoords = location => {
    const request = axios.get(`${baseGeoUrl}${location}&limit=1&appid=${api_key}`)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    const request = axios.get(`${baseWeatherUrl}${lat}&lon=${lon}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default {getCoords, getWeather}
