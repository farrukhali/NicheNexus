import React from 'react';
import { CloudSun, Leaf, Snowflake, Sun, Thermometer } from 'lucide-react';

export default function SeasonalTip() {
    const month = new Date().getMonth(); // 0-11

    // Determine season
    let season = 'Spring';
    if (month >= 2 && month <= 4) season = 'Spring';
    else if (month >= 5 && month <= 7) season = 'Summer';
    else if (month >= 8 && month <= 10) season = 'Autumn';
    else season = 'Winter';

    // Seasonal content
    const content = {
        'Spring': {
            icon: <CloudSun className="w-8 h-8 text-green-500" />,
            title: "Spring Maintenance Check",
            tip: "As temperatures rise, inspect for rapid contraction/expansion damage from winter. Early detection saves major repair costs.",
            color: "green"
        },
        'Summer': {
            icon: <Sun className="w-8 h-8 text-amber-500" />,
            title: "Heat Protection Tip",
            tip: "High UV indices can degrade sealants. Ensure your system is coated or shielded to prevent premature heat cracking.",
            color: "amber"
        },
        'Autumn': {
            icon: <Leaf className="w-8 h-8 text-orange-500" />,
            title: "Fall Preparation",
            tip: "Clear debris now before winter sets in. Blockages combined with freezing temps are the #1 cause of failure.",
            color: "orange"
        },
        'Winter': {
            icon: <Snowflake className="w-8 h-8 text-blue-400" />,
            title: "Freeze Alert Protocol",
            tip: "Watch for ice damming. If you see buildup, do not chip it away manually as this damages the substrate. Call for steam removal.",
            color: "blue"
        }
    };

    const currentSeason = content[season as keyof typeof content];

    return (
        <div className={`bg-white rounded-2xl border border-${currentSeason.color}-200 p-6 shadow-sm relative overflow-hidden`}>
            {/* Background Decoration */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${currentSeason.color}-100 rounded-full opacity-50 blur-xl`}></div>

            <div className="relative z-10 flex gap-5 items-start">
                <div className={`p-3 bg-${currentSeason.color}-50 rounded-xl flex-shrink-0 border border-${currentSeason.color}-100`}>
                    {currentSeason.icon}
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                        {currentSeason.title}
                        <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 bg-${currentSeason.color}-100 text-${currentSeason.color}-700 rounded-full`}>
                            {season} Tip
                        </span>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        {currentSeason.tip}
                    </p>
                </div>
            </div>
        </div>
    );
}
