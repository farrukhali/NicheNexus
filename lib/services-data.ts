export interface ServiceDetail {
    title: string
    slug: string
    description: (city: string, state: string) => string
    icon: string
    features: string[]
    benefits: string[]
}

export const servicesData: Record<string, ServiceDetail> = {
    "sump-pump-installation": {
        title: "Sump Pump Installation",
        slug: "sump-pump-installation",
        description: (city, state) => `Searching for sump pump installation near me in ${city}, ${state}? We install high-performance cast-iron submersible and pedestal pumps. Right-sized for your basement to handle even the heaviest storms.`,
        icon: "💧",
        features: ["Submersible and pedestal pump options", "1/3, 1/2, and 3/4 HP capacities", "Cast-iron housing for durability", "Silent check valve installation", "New sealed basin installation"],
        benefits: ["Prevents basement flooding", "Protects foundation health", "Reduces basement humidity", "Quiet operation", "Increases property value"]
    },
    "battery-backup-systems": {
        title: "Battery Backup Systems",
        slug: "battery-backup-systems",
        description: (city, state) => `Looking for battery backup sump pumps near me in ${city}, ${state}? Our backup systems kick in automatically when the power fails, keeping your basement dry during severe storms.`,
        icon: "🔋",
        features: ["Automatic switch-over during outage", "AGM maintenance-free batteries", "Smart monitoring and alarms", "Dual-pump redundancy configuration", "Days of continuous runtime"],
        benefits: ["Peace of mind during power outages", "Secondary pump protection", "Wifi alerts to your phone", "Prevents costly water damage", "Works when you need it most"]
    },
    "sewage-ejector-pumps": {
        title: "Sewage Ejector Pumps",
        slug: "sewage-ejector-pumps",
        description: (city, state) => `Need sewage pump repair near me in ${city}, ${state}? We install and repair sewage ejector pumps for basement bathrooms and laundry rooms. Handle solids up to 2 inches reliably.`,
        icon: "🚽",
        features: ["Grinder and non-clog vortex impellers", "Sealed gas-tight basins", "2-inch discharge lines", "Vent pipe installation", "Alarm system integration"],
        benefits: ["Enables basement bathrooms", "Prevents sewage backups", "Odor-free operation", "Reliable waste removal", "Code-compliant installation"]
    },
    "basement-waterproofing": {
        title: "Basement Waterproofing",
        slug: "basement-waterproofing",
        description: (city, state) => `Searching for basement waterproofing near me in ${city}, ${state}? We provide comprehensive solutions including vapor barriers, crack repair, and interior drainage to keep your home dry and healthy.`,
        icon: "🏠",
        features: ["Interior perimeter drainage", "Vapor barrier wall encapsulation", "Foundation crack injection", "Dehumidifier installation", "Mold prevention treatments"],
        benefits: ["Creates usable living space", "Eliminates musty odors", "Improves indoor air quality", "Stops mold growth", "Permanent dry basement guarantee"]
    },
    "french-drain-installation": {
        title: "French Drain Installation",
        slug: "french-drain-installation",
        description: (city, state) => `Need french drain installation near me in ${city}, ${state}? We install interior and exterior french drains to channel water away from your foundation. The most effective solution for hydrostatic pressure.`,
        icon: "🚇",
        features: ["Perforated pipe with filter fabric", "Clean washed gravel backfill", "Connection to sump basin", "Exterior footing drains", "Interior sub-floor drains"],
        benefits: ["Relieves hydrostatic pressure", "Captures floor-wall joint leaks", "Long-term foundation protection", "Prevents floor cracks", "Highly effective drainage"]
    },
    "smart-sump-pumps": {
        title: "Smart Sump Pumps",
        slug: "smart-sump-pumps",
        description: (city, state) => `Want a smart sump pump in ${city}, ${state}? Get real-time alerts to your smartphone about water levels, pump status, and power failures. Stay connected to your home's protection 24/7.`,
        icon: "📱",
        features: ["Wifi connectivity app", "Real-time water level monitoring", "Power failure notifications", "Pump cycling history logs", "Remote testing capabilities"],
        benefits: ["Know before you flood", "Monitor from anywhere", "Early warning system", "Prevents surprise failures", "Integration with smart home"]
    },
    "commercial-pump-services": {
        title: "Commercial Pump Services",
        slug: "commercial-pump-services",
        description: (city, state) => `Need commercial sump pump services in ${city}, ${state}? We serve warehouses, apartments, and retail spaces with heavy-duty duplex systems and elevator pit pumps.`,
        icon: "🏢",
        features: ["Duplex control panels", "Elevator sump pumps", "3-phase power pumps", "High-head / high-flow systems", "Scheduled maintenance plans"],
        benefits: ["Complies with building codes", "Protect business assets", "Reliable redundant systems", "Minimize downtime", "Professional documentation"]
    },
    "emergency-plumber": {
        title: "Emergency Sump Pump Repair",
        slug: "emergency-plumber",
        description: (city, state) => `Emergency sump pump repair in ${city}, ${state}. Pump failed in a storm? We offer 24/7 rapid response to replace pumps and stop flooding. Call now for immediate help.`,
        icon: "🚨",
        features: ["24/7 Rapid Response", "Trucks stocked with all pumps", "Temporary water removal", "Generator power available", "Direct insurance billing"],
        benefits: ["Stops rising water immediately", "Saves finished basements", "Prevents mold outbreaks", "Peace of mind in storms", "Licensed master plumbers"]
    }
}
