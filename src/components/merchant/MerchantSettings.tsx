import React from 'react';

interface MerchantSettingsProps {
    profileData: {
        description: string;
        descriptionLong: string;
        phone: string;
        whatsapp: string;
        websiteUrl: string;
        email: string;
    };
    setProfileData: React.Dispatch<React.SetStateAction<MerchantSettingsProps['profileData']>>;
    onUpdateProfile: (e: React.FormEvent) => void;
    formErrors: Record<string, string>;
}

export const MerchantSettings: React.FC<MerchantSettingsProps> = ({
    profileData,
    setProfileData,
    onUpdateProfile,
    formErrors
}) => {
    return (
        <div className="min-h-screen bg-[#05080a] text-slate-300 font-sans selection:bg-red-500/30 -m-8 p-8">
            {/* Nocturnal Header */}
            <div className="pt-12 pb-8 px-6">
                <div className="flex justify-between items-center mb-6">
                    <button className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-slate-400">arrow_back</span>
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 bg-red-500/10 px-3 py-1 rounded">Nocturnal</span>
                </div>
                <h1 className="text-5xl font-black text-white leading-tight tracking-tighter mb-4 font-headline">
                    System-<br />Architektur
                </h1>
                <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
                    Konfigurieren Sie Ihre professionelle Präsenz und die Parameter für Ihren digitalen Workspace.
                </p>
            </div>

            <div className="px-4 pb-32 space-y-6">
                {/* Profile Settings Section */}
                <div className="bg-[#0c1218] rounded-[32px] p-8 border border-white/[0.03]">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400/90 mb-8">Profil-Einstellungen</h3>

                    <form onSubmit={onUpdateProfile} className="space-y-8">
                        <div className="space-y-6">
                            <div className="group">
                                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-red-500 transition-colors">Öffentlicher Name</label>
                                <input
                                    className={`w-full bg-[#05080a] border border-white/[0.05] px-5 py-4 rounded-2xl focus:ring-1 focus:ring-red-500/50 outline-none transition-all text-white font-medium ${formErrors.description ? "border-red-500" : ""}`}
                                    value={profileData.description}
                                    onChange={e => setProfileData({ ...profileData, description: e.target.value })}
                                />
                            </div>

                            <div className="group">
                                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-red-500 transition-colors">Professionelle Bio</label>
                                <textarea
                                    className={`w-full bg-[#05080a] border border-white/[0.05] px-5 py-4 rounded-2xl focus:ring-1 focus:ring-red-500/50 outline-none min-h-[140px] resize-none transition-all text-white text-sm leading-relaxed ${formErrors.descriptionLong ? "border-red-500" : ""}`}
                                    value={profileData.descriptionLong}
                                    onChange={e => setProfileData({ ...profileData, descriptionLong: e.target.value })}
                                />
                            </div>
                        </div>

                        <button className="w-full bg-gradient-to-br from-red-500/90 to-red-600 text-white py-5 rounded-full font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl shadow-red-900/20 active:scale-[0.97] transition-all">
                            Manifest aktualisieren
                        </button>
                    </form>
                </div>

                {/* Network Pulses Section */}
                <div className="bg-[#0c1218] rounded-[32px] p-8 border border-white/[0.03]">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400/90 mb-8">Netzwerk-Pulse</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
                                    <span className="material-symbols-outlined text-xl">chat_bubble</span>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Eingehende Anfragen</div>
                                    <div className="text-[10px] text-slate-500">Benachrichtigen bei High-Priority Kunden</div>
                                </div>
                            </div>
                            <div className="w-12 h-6 bg-red-500/30 rounded-full relative flex items-center px-1">
                                <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between opacity-50">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                                    <span className="material-symbols-outlined text-xl">campaign</span>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Branchen-News</div>
                                    <div className="text-[10px] text-slate-500">Wöchentlicher Digest und Trends</div>
                                </div>
                            </div>
                            <div className="w-12 h-6 bg-white/10 rounded-full relative flex items-center px-1">
                                <div className="w-4 h-4 bg-slate-600 rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appearance Section */}
                <div className="bg-[#0c1218] rounded-[32px] p-8 border border-white/[0.03]">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400/90 mb-8">Erscheinungsbild</h3>
                    <div className="bg-[#05080a] p-1.5 rounded-2xl flex gap-1 mb-8">
                        <button className="flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">Tag</button>
                        <button className="flex-1 py-3 bg-[#0c1218] rounded-xl text-[10px] font-black uppercase tracking-[0.1em] text-white shadow-lg shadow-black/50">Nacht</button>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400">Reduzierte Animationen</span>
                            <div className="w-4 h-4 rounded-full border-2 border-slate-700"></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400">Hoher Kontrast</span>
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-sm shadow-red-500/50"></div>
                        </div>
                    </div>
                </div>

                {/* Privacy Vault */}
                <div className="bg-[#0c1218] rounded-[32px] p-8 border border-white/[0.03]">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400/90 mb-8">Datenschutz-Tresor</h3>
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-slate-500">visibility_off</span>
                            <div>
                                <div className="text-sm font-bold text-white">Stealth-Modus</div>
                                <div className="text-[10px] text-slate-500">Status vor externen Kontakten verbergen</div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-slate-500">database</span>
                            <div>
                                <div className="text-sm font-bold text-white">Datenhoheit</div>
                                <div className="text-[10px] text-slate-500">Download oder Löschung Ihrer Historie</div>
                            </div>
                        </div>
                        <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border border-white/[0.05] rounded-2xl hover:bg-white/5 transition-colors">
                            Anmeldedaten verwalten
                        </button>
                    </div>
                </div>

                {/* Architect Pro+ Card */}
                <div className="bg-gradient-to-b from-[#1a0505] to-[#0a0505] rounded-[32px] p-10 border border-red-950 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
                    <span className="material-symbols-outlined text-red-600 text-3xl mb-6 filled-icon">star</span>
                    <h2 className="text-xl font-black text-white uppercase tracking-[0.1em] mb-4">Architect Pro+</h2>
                    <p className="text-xs text-red-200/50 leading-relaxed mb-10 max-w-[240px]">
                        Schalten Sie erweiterte Analysen und direkten Zugang zu Top-Designstudios weltweit frei.
                    </p>
                    <button className="w-full bg-[#b52426] text-white py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-red-950/50 active:scale-95 transition-all">
                        Jetzt upgraden
                    </button>
                </div>
            </div>
        </div>
    );
};
