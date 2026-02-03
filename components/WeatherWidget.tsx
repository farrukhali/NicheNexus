import { WeatherData } from '@/lib/weather'
import {
    Cloud,
    CloudDrizzle,
    CloudFog,
    CloudLightning,
    CloudRain,
    CloudSnow,
    CloudSun,
    Droplets,
    Sun,
    Wind,
    Thermometer,
    Info
} from 'lucide-react'

interface WeatherWidgetProps {
    city: string
    weather: WeatherData
}

export default function WeatherWidget({ city, weather }: WeatherWidgetProps) {
    const getWeatherIcon = (description: string) => {
        const desc = description.toLowerCase();
        if (desc.includes('clear')) return <Sun className="w-8 h-8 text-yellow-400" aria-hidden="true" />;
        if (desc.includes('partly') || desc.includes('mainly clear')) return <CloudSun className="w-8 h-8 text-blue-300" aria-hidden="true" />;
        if (desc.includes('overcast') || desc.includes('cloudy')) return <Cloud className="w-8 h-8 text-slate-400" aria-hidden="true" />;
        if (desc.includes('drizzle')) return <CloudDrizzle className="w-8 h-8 text-blue-400" aria-hidden="true" />;
        if (desc.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-500" aria-hidden="true" />;
        if (desc.includes('snow')) return <CloudSnow className="w-8 h-8 text-slate-200" aria-hidden="true" />;
        if (desc.includes('fog')) return <CloudFog className="w-8 h-8 text-slate-500" aria-hidden="true" />;
        if (desc.includes('thunderstorm')) return <CloudLightning className="w-8 h-8 text-purple-500" aria-hidden="true" />;
        return <Sun className="w-8 h-8 text-yellow-400" aria-hidden="true" />;
    };

    // Installation recommendations based on weather
    const getAdvice = (description: string) => {
        const desc = description.toLowerCase();
        if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('thunderstorm')) {
            return {
                text: "Outdoor installation might be delayed due to precipitation.",
                color: "text-amber-400",
                status: "Delayed Possible"
            };
        }
        if (desc.includes('snow')) {
            return {
                text: "Installation likely rescheduled for safety.",
                color: "text-red-400",
                status: "Reschedule Likely"
            };
        }
        return {
            text: "Conditions are optimal for scheduled installation.",
            color: "text-emerald-400",
            status: "Optimal"
        };
    };

    const advice = getAdvice(weather.description);

    return (
        <aside
            role="region"
            aria-labelledby="weather-heading"
            className="group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl transition-all duration-300 hover:border-white/20"
        >
            <div className="flex flex-col gap-6">
                {/* Header: Title and Status */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 id="weather-heading" className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Info className="w-3 h-3" />
                            Local Conditions
                        </h2>
                        <p className="text-xl font-semibold text-white mt-1">
                            {city} Weather
                        </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${advice.color.replace('text', 'border')} ${advice.color.replace('text', 'bg-')}/10 ${advice.color}`}>
                        {advice.status}
                    </div>
                </div>

                {/* Main: Temperature and Icon */}
                <div className="flex items-center gap-6 py-2">
                    <div className="p-4 bg-white/5 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                        {getWeatherIcon(weather.description)}
                    </div>
                    <div>
                        <div className="flex items-start gap-1">
                            <span className="text-5xl font-black text-white tracking-tighter">
                                {weather.temperature}
                            </span>
                            <span className="text-2xl font-bold text-blue-400/80 mt-1">°F</span>
                        </div>
                        <p className="text-slate-300 font-medium capitalize mt-1">
                            {weather.description}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <Droplets className="w-4 h-4 text-blue-400" aria-hidden="true" />
                        <div>
                            <p className="text-[10px] text-slate-400 font-medium uppercase leading-none mb-1">Humidity</p>
                            <p className="text-sm font-bold text-white">{weather.humidity}%</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <Wind className="w-4 h-4 text-slate-400" aria-hidden="true" />
                        <div>
                            <p className="text-[10px] text-slate-400 font-medium uppercase leading-none mb-1">Wind</p>
                            <p className="text-sm font-bold text-white">{weather.windSpeed} <span className="text-[10px] opacity-70">mph</span></p>
                        </div>
                    </div>
                </div>

                {/* Advisor Section */}
                <div className="mt-2 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                    <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                        <Thermometer className="w-3 h-3" />
                        Installation Advisor
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                        {advice.text} Our crews monitor {weather.description.toLowerCase()} daily for {city} residents.
                    </p>
                </div>
            </div>

            {/* Screen Reader Only Info */}
            <div className="sr-only">
                Current temperature in {city} is {weather.temperature} degrees Fahrenheit with {weather.description}.
                Humidity is {weather.humidity} percent and wind speed is {weather.windSpeed} miles per hour.
                {advice.text}
            </div>
        </aside>
    )
}
