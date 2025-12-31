
export default function CityMap({ city, state }: { city: string, state: string }) {
    const query = encodeURIComponent(`${city}, ${state}`);
    return (
        <div className="w-full h-64 rounded-xl overflow-hidden border border-slate-200 mt-6 shadow-sm">
            <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={`https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
            ></iframe>
        </div>
    )
}
