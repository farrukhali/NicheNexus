import React from 'react';
import { CheckCircle2, MapPin, CalendarDays, ArrowUpRight } from 'lucide-react';

interface RecentActivityProps {
    city: string;
    stateCode: string;
    serviceName: string;
    zipCodes?: string[];
}

export default function RecentActivity({ city, stateCode, serviceName, zipCodes = [] }: RecentActivityProps) {
    // Helper to get formatted date relative to today
    const getRelativeDate = (daysAgo: number) => {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Deterministic generation based on date + city (so it stays consistent for 24h but changes daily)
    // This prevents it from changing on every hydration which looks glitchy
    const generateActivity = () => {
        const activities = [
            { type: 'Installation', icon: '🏗️', suffix: '' },
            { type: 'Emergency Repair', icon: '🚨', suffix: ' - Urgent Dispatch' },
            { type: 'Inspection', icon: '📋', suffix: '' },
            { type: 'Maintenance', icon: '🔧', suffix: '' },
            { type: 'Replacement', icon: '🏠', suffix: '' },
            { type: 'Service Call', icon: '🚛', suffix: '' },
        ];

        // Ensure we have zip codes or fallback to generic neighborhoods
        const locations = zipCodes.length > 0
            ? zipCodes.map(z => `Zip Code ${z}`)
            : ['Downtown', 'North Side', 'West End', 'Business District', 'Residential Area'];

        return [
            {
                service: `${serviceName} ${activities[0].type}`,
                location: `${locations[0] || city}`,
                date: getRelativeDate(1), // Yesterday
                status: 'Completed'
            },
            {
                service: `${activities[1].type} ${activities[1].suffix}`,
                location: `${locations[1] || city}`,
                date: getRelativeDate(2),
                status: 'Verified'
            },
            {
                service: `${serviceName} ${activities[3].type}`,
                location: `${locations[2] || locations[0] || city}`,
                date: getRelativeDate(4),
                status: 'Completed'
            }
        ];
    };

    const jobs = generateActivity();

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <span className="absolute -right-0.5 -top-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-50 animate-pulse"></span>
                        <CalendarDays className="w-5 h-5 text-slate-500" />
                    </div>
                    <span className="font-bold text-slate-700 text-sm uppercase tracking-wide">Recent Activity in {city}</span>
                </div>
                <span className="text-xs font-medium text-slate-400">Live Feed</span>
            </div>

            <div className="divide-y divide-slate-100">
                {jobs.map((job, i) => (
                    <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                            <CheckCircle2 size={20} />
                        </div>
                        <div className="flex-grow min-w-0">
                            <h4 className="font-semibold text-slate-900 text-sm truncate">{job.service}</h4>
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                    <MapPin size={12} /> {job.location}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span>{job.date}</span>
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0 hidden sm:block">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                {job.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-500">
                    Our {stateCode} crews are active in your area. <span className="font-semibold text-blue-600">Next available slot: Today</span>
                </p>
            </div>
        </div>
    );
}
