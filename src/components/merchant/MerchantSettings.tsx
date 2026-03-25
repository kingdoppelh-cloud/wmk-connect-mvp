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
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
            <h3 className="text-xl font-black text-slate-900 mb-6 uppercase italic">Unternehmensprofil</h3>

            <form onSubmit={onUpdateProfile} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 text-left">Kurzbeschreibung</label>
                        <input
                            className={`w-full bg-slate-50 border px-4 py-3 rounded-xl focus:ring-2 outline-none transition-colors ${formErrors.description ? "border-red-500 focus:ring-red-500/20" : "border-slate-100 focus:ring-accent/20"
                                }`}
                            value={profileData.description}
                            onChange={e => setProfileData({ ...profileData, description: e.target.value })}
                        />
                        {formErrors.description && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider">{formErrors.description}</p>}
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 text-left">Ausführlicher Text</label>
                        <textarea
                            className={`w-full bg-slate-50 border px-4 py-3 rounded-xl focus:ring-2 outline-none min-h-[120px] resize-none transition-colors ${formErrors.descriptionLong ? "border-red-500 focus:ring-red-500/20" : "border-slate-100 focus:ring-accent/20"
                                }`}
                            value={profileData.descriptionLong}
                            onChange={e => setProfileData({ ...profileData, descriptionLong: e.target.value })}
                        />
                        {formErrors.descriptionLong && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider">{formErrors.descriptionLong}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 text-left">WhatsApp Nummer</label>
                            <input
                                className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none"
                                value={profileData.whatsapp}
                                onChange={e => setProfileData({ ...profileData, whatsapp: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 text-left">Website URL</label>
                            <input
                                className={`w-full bg-slate-50 border px-4 py-3 rounded-xl focus:ring-2 outline-none transition-colors ${formErrors.websiteUrl ? "border-red-500 focus:ring-red-500/20" : "border-slate-100 focus:ring-accent/20"
                                    }`}
                                value={profileData.websiteUrl}
                                onChange={e => setProfileData({ ...profileData, websiteUrl: e.target.value })}
                                placeholder="https://..."
                            />
                            {formErrors.websiteUrl && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider">{formErrors.websiteUrl}</p>}
                        </div>
                    </div>
                </div>

                <button className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98]">
                    Änderungen speichern
                </button>
            </form>
        </div>
    );
};
