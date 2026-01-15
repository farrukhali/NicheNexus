import { Shield, Award, Clock, BadgeCheck, Building2, ShieldCheck } from "lucide-react"

interface AuthoritySignalsProps {
    stateCode: string
    city: string
}

export default function AuthoritySignals({ stateCode, city }: AuthoritySignalsProps) {
    const credentials = [
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "EPA RRP Certified",
            description: "Lead-Safe Certified Firm #NAT-F188921",
            color: "bg-green-50 text-green-600 border-green-200"
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "OSHA 30 Certified",
            description: "All crews OSHA-30 construction safety trained",
            color: "bg-blue-50 text-blue-600 border-blue-200"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: `${stateCode.toUpperCase()} Licensed`,
            description: `State licensed contractor in ${stateCode.toUpperCase()}`,
            color: "bg-purple-50 text-purple-600 border-purple-200"
        },
        {
            icon: <BadgeCheck className="w-6 h-6" />,
            title: "$2M Insured",
            description: "Fully bonded with $2M liability coverage",
            color: "bg-amber-50 text-amber-600 border-amber-200"
        },
        {
            icon: <Building2 className="w-6 h-6" />,
            title: "BBB A+ Rated",
            description: "Accredited business since 2010",
            color: "bg-cyan-50 text-cyan-600 border-cyan-200"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "14+ Years",
            description: "Serving homeowners since 2010",
            color: "bg-slate-50 text-slate-600 border-slate-200"
        }
    ]

    return (
        <section className="py-12 px-6 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        Why Trust US Gutter Installation in {city}?
                    </h2>
                    <p className="text-slate-600 text-sm max-w-2xl mx-auto">
                        We're not just contractors—we're licensed, certified professionals with industry-leading credentials
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {credentials.map((cred, i) => (
                        <div
                            key={i}
                            className={`p-4 rounded-xl border ${cred.color} text-center transition-transform hover:scale-105`}
                        >
                            <div className="flex justify-center mb-2">
                                {cred.icon}
                            </div>
                            <h3 className="font-bold text-sm mb-1">{cred.title}</h3>
                            <p className="text-xs opacity-80">{cred.description}</p>
                        </div>
                    ))}
                </div>

                {/* Schema for E-E-A-T signals */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "US Gutter Installation",
                            "hasCredential": [
                                {
                                    "@type": "EducationalOccupationalCredential",
                                    "credentialCategory": "certification",
                                    "name": "EPA RRP Lead-Safe Certified Firm",
                                    "recognizedBy": {
                                        "@type": "Organization",
                                        "name": "U.S. Environmental Protection Agency"
                                    }
                                },
                                {
                                    "@type": "EducationalOccupationalCredential",
                                    "credentialCategory": "certification",
                                    "name": "OSHA 30-Hour Construction Safety",
                                    "recognizedBy": {
                                        "@type": "Organization",
                                        "name": "Occupational Safety and Health Administration"
                                    }
                                },
                                {
                                    "@type": "EducationalOccupationalCredential",
                                    "credentialCategory": "license",
                                    "name": `${stateCode.toUpperCase()} State Contractor License`
                                }
                            ],
                            "memberOf": [
                                {
                                    "@type": "Organization",
                                    "name": "Better Business Bureau",
                                    "url": "https://www.bbb.org"
                                }
                            ],
                            "award": [
                                "BBB A+ Rating",
                                "Best of HomeAdvisor Award",
                                "Angi Super Service Award"
                            ]
                        })
                    }}
                />
            </div>
        </section>
    )
}
