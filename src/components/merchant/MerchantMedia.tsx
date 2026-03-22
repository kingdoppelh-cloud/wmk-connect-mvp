import React from 'react';
import { Camera, Plus, X } from 'lucide-react';
import type { Company } from '../../data/companies';

interface MerchantMediaProps {
    company: Company;
    onAddGalleryImage: () => void;
    onRemoveGalleryImage: (url: string) => void;
    onUpdateLogo: () => void;
}

export const MerchantMedia: React.FC<MerchantMediaProps> = ({
    company,
    onAddGalleryImage,
    onRemoveGalleryImage,
    onUpdateLogo
}) => {
    return (
        <div className="space-y-6">
            {/* Logo Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 flex flex-col items-center">
                <div className="relative group cursor-pointer" onClick={onUpdateLogo}>
                    <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 overflow-hidden border-4 border-white shadow-xl">
                        <img src={company.image} alt={company.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-white" size={32} />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent text-white rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                        <Camera size={18} />
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <h3 className="text-xl font-black text-slate-900">{company.name}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{company.category} • {company.address}</p>
                </div>
            </div>

            {/* Gallery Management Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-slate-900">Bildergalerie</h3>
                    <button
                        onClick={onAddGalleryImage}
                        className="text-accent text-sm font-bold flex items-center gap-2"
                    >
                        <Plus size={16} /> Hinzufügen
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {company.gallery && company.gallery.length > 0 ? (
                        company.gallery.map((img, idx) => (
                            <div key={idx} className="group relative aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-200/60">
                                <img
                                    alt={`Gallery ${idx}`}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                    src={img}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <button
                                    onClick={() => onRemoveGalleryImage(img)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 py-10 flex flex-col items-center justify-center text-slate-400 space-y-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                            <Camera size={32} strokeWidth={1.5} />
                            <p className="text-xs font-medium uppercase tracking-[0.1em]">Keine Bilder in der Galerie</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
