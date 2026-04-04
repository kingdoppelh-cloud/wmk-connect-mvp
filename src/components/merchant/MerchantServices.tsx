import { Globe, Bot, Sparkles, MessageSquare, Megaphone, CheckCircle2, ArrowRight } from 'lucide-react';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    price: string;
    tag?: string;
    features: string[];
}

const PREMIUM_SERVICES: Service[] = [
    {
        id: 'website-new',
        title: 'High-End Web Präsenz',
        description: 'Wir bauen Ihre digitale Identität von Grund auf. Modern, schnell und für Mobilgeräte optimiert.',
        icon: <Globe className="w-8 h-8 text-blue-400" />,
        price: 'ab 1.490 €',
        tag: 'Bestseller',
        features: ['SEO Optimierung', 'Individuelles Design', 'Hosting inklusive', 'WMK Connect Integration']
    },
    {
        id: 'website-redesign',
        title: 'Website Redesign',
        description: 'Hauchen Sie Ihrer alten Website neues Leben ein mit modernster UI/UX.',
        icon: <Sparkles className="w-8 h-8 text-purple-400" />,
        price: 'ab 890 €',
        features: ['Modernes Layout', 'Schnellere Ladezeiten', 'Conversion Optimierung']
    },
    {
        id: 'ai-chatbots',
        title: 'KI-Chat- & Voicebots',
        description: 'Automatisieren Sie Ihren Kundensupport rund um die Uhr mit intelligenter KI.',
        icon: <Bot className="w-8 h-8 text-emerald-400" />,
        price: 'ab 290 € / mtl.',
        tag: 'KI-Power',
        features: ['Terminbuchung via Chat', 'WhatsApp Integration', 'Sprachsteuerung']
    },
    {
        id: 'social-media',
        title: 'Social Media Management',
        description: 'Hochprofessionelle Posts und Reels, die Ihre Marke in der Region bekannt machen.',
        icon: <Megaphone className="w-8 h-8 text-orange-400" />,
        price: 'ab 490 € / mtl.',
        features: ['KI Content Strategie', 'Wöchentliche Posts', 'Regionales Targeting']
    },
    {
        id: 'lead-reactivation',
        title: 'Lead Reaktivierung',
        description: 'Holen Sie schlafende Kunden zurück mit automatisierten Kampagnen.',
        icon: <MessageSquare className="w-8 h-8 text-red-400" />,
        price: 'Token-basiert',
        features: ['Automatisierte Workflows', 'Personalisierte Ansprache', 'Hohe Erfolgsquote']
    }
];

export const MerchantServices: React.FC = () => {
    const handleBook = (service: Service) => {
        alert(`Anfrage für "${service.title}" wurde vorgemerkt. Unser Team meldet sich in Kürze!`);
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="px-4 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                    <Sparkles size={14} className="text-accent animate-pulse" />
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Premium Partner Services</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 uppercase italic leading-none">
                    Digitaler <span className="text-accent">Wachstum</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium italic max-w-lg">
                    Exklusive Services für WMK Connect Partner. Wir machen Ihr Unternehmen fit für die digitale Zukunft – von der Website bis zur KI-Automatisierung.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                {PREMIUM_SERVICES.map((service) => (
                    <div
                        key={service.id}
                        className="group relative bg-slate-900 rounded-[32px] overflow-hidden border border-slate-800 transition-all hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10"
                    >
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 p-8 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-inner">
                                    {service.icon}
                                </div>
                                {service.tag && (
                                    <span className="px-3 py-1 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                                        {service.tag}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tight">
                                    {service.title}
                                </h3>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-slate-300">
                                        <CheckCircle2 size={14} className="text-accent" />
                                        <span className="text-xs font-bold uppercase tracking-wider">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Investition</p>
                                    <p className="text-xl font-black text-white">{service.price}</p>
                                </div>
                                <button
                                    onClick={() => handleBook(service)}
                                    className="bg-white text-slate-900 h-12 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group-hover:bg-accent group-hover:text-white"
                                >
                                    Jetzt anfragen
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Coming Soon Card */}
                <div className="relative bg-slate-950/50 rounded-[32px] p-8 border border-slate-900 border-dashed flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-slate-700 border border-slate-800">
                        <Sparkles size={32} />
                    </div>
                    <div>
                        <h3 className="text-slate-500 font-black uppercase italic tracking-widest">Weitere Services</h3>
                        <p className="text-slate-600 text-xs font-medium">Demnächst verfügbar...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
