import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RegionalNews: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-secondary font-bold uppercase tracking-widest text-xs">Aktuelles</p>
                    <h2 className="text-4xl font-black text-primary tracking-tight">Regionale News</h2>
                </div>
                <button
                    onClick={() => navigate('/news')}
                    className="text-primary font-bold border-b-2 border-primary pb-1 flex items-center gap-2 text-sm"
                >
                    Alle Artikel <ExternalLink className="w-4 h-4" />
                </button>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Feature Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col">
                    <div className="h-64 overflow-hidden relative">
                        <img
                            alt="Regional networking event"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvP9lv3ax36UzQp8Zx5PWlKQ7fKFTIJQhMLSdc9-va1IHrEDneaFJQT0j8iuXz4NeNKYj_DgKn0x5tUArVuPuLt0ovcaL6-Nzfk7K3eL1IuMktctpdJZRIEB8UfRJWKc7XIw7dMv_LoRuUJ3sMj4eu8mRA6_Ut0Mw3me0FCazMxBnNg0xKfav-Hzp0uXonUiCbsUmSQzM6I3t1mXJDRFYkQ5g46q6xiwH2JajaUizuZlEErh0AKASf8qoeAaRCcnYGJOBxdbdXQDo"
                        />
                        <span className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                            Top News
                        </span>
                    </div>
                    <div className="p-8">
                        <time className="text-slate-500 text-xs font-bold uppercase tracking-widest">12. OKT 2026</time>
                        <h3 className="text-2xl font-black text-primary mt-3 mb-4 leading-tight">
                            Zukunftsdialog: Digitalisierung im Handwerk
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            Wie lokale Betriebe von der neuen Vernetzung profitieren und welche Fördermittel jetzt im Kreis bereitstehen.
                        </p>
                        <button
                            onClick={() => navigate('/news')}
                            className="mt-6 text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all"
                        >
                            Weiterlesen <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Secondary News List */}
                <div className="space-y-6">
                    <div className="flex gap-6 items-center group cursor-pointer bg-surface-container-low/50 p-4 rounded-xl hover:bg-surface-container-low transition-colors" onClick={() => navigate('/news')}>
                        <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden">
                            <img alt="Education center" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCziUFfcFNCMumvoWAhbF0gdPVV1vM4O7RJAjOSsOWEByt277Uk18S9gIhHjxztqjyCTE4uKecS4iNwpxbuZA212OIvbOhHs1F8G1ACnKGCA80t1z6iHkQE4XRCHvyqobqURz9fwvEOwnZLvDXcOpFHB5T6J1UnRd0bXPzzzgFEHVuTRBAtYIGXwlkoYg6733kvYHrCgizY3c9oYVfRI59EAbX4j8jNnNTAQLmz1hb8-0-ct4mucrHuUK5pbRIpmaNLgd-_3PgbNhc" />
                        </div>
                        <div>
                            <time className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">08. OKT 2026</time>
                            <h4 className="text-lg font-bold text-primary mt-1 leading-tight">Neues Gründerzentrum in Eschwege eröffnet</h4>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center group cursor-pointer bg-surface-container-low/50 p-4 rounded-xl hover:bg-surface-container-low transition-colors" onClick={() => navigate('/news')}>
                        <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden">
                            <img alt="Business team" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX7m3lI9pD8xY5kMG-rMQ50msHZVsCNXUhaL_oR9kUYrVbZ-BbrniLcW55n-n-oI1xFgNI_cW1F_Scu4luNDAlPPhWpvSsxlA9dcyh6ScQb2lix0kgf-9-sbq7dXn82tOqhnoBxWg_W6Em141jN746NdjGmcI3MXxpNzf4FLZH1gK-7Y2KqMrSxryGowbfRTJe_buG2FEbi7o4T5lHZJ_EwBDHVfXmXWIRC3FT-YsbHTZn77xfiYIQNclptyFoOmjUKTDSK-t2RLg" />
                        </div>
                        <div>
                            <time className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">05. OKT 2026</time>
                            <h4 className="text-lg font-bold text-primary mt-1 leading-tight">Fachkräftemangel: Strategien für den Mittelstand</h4>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center group cursor-pointer bg-surface-container-low/50 p-4 rounded-xl hover:bg-surface-container-low transition-colors" onClick={() => navigate('/news')}>
                        <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden">
                            <img alt="Office workspace" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1iPnUwvMUY1zi21N2X3RxjvMNvDk2a3mN2M0J-lnUFxKKj8X2hR-Tk-YsD4B5TIuio5U51qYEhsC1wHV_By-LtFD8IkFqXk8rurPV-HuZefREPkA6EaUmi7NW9h_GCTLmAyeaoTF_19u5xUEZiWQKREXZycNfxkDF97ky17gSfQvT5Eeulc7UPQTmp07dEwG5rIE_7wvFSptLHi8r2HNRPNAI3g9JP0gEJdH-Zb4r-SUahpOZGa3n12uVC5c8hWidKpssV2NnpTM" />
                        </div>
                        <div>
                            <time className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">01. OKT 2026</time>
                            <h4 className="text-lg font-bold text-primary mt-1 leading-tight">Remote Work: Trends im ländlichen Raum</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
