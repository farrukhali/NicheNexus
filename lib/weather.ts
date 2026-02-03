export interface WeatherData {
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
}

export async function getWeatherData(lat: number, lng: number): Promise<WeatherData | null> {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) return null;

        const data = await response.json();
        const current = data.current;

        return {
            temperature: Math.round(current.temperature_2m),
            description: getWeatherDescription(current.weather_code),
            icon: getWeatherIcon(current.weather_code),
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m),
        };
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}

function getWeatherDescription(code: number): string {
    const descriptions: Record<number, string> = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snow fall',
        73: 'Moderate snow fall',
        75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail',
    };
    return descriptions[code] || 'Clear sky';
}

function getWeatherIcon(code: number): string {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 55) return '🌦️';
    if (code <= 65) return '🌧️';
    if (code <= 75) return '❄️';
    if (code <= 82) return '🌧️';
    if (code >= 95) return '⚡';
    return '☀️';
}
