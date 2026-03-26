import React, { useState, useEffect } from 'react';
import { X, Save, MapPin, Globe, Phone, MessageCircle, Mail, Clock, Star, Camera, Trash2, Plus } from 'lucide-react';
import { type Company } from '../data/companies';

interface Props {
    company?: Company;
    onClose: () => void;
    onSave: (data: Partial<Company>) => Promise<void>;
    onUpload?: (file: File, path: string) => Promise<string>;
}

export const CompanyForm: React.FC<Props> = ({ company, onClose, onSave, onUpload }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState<Partial<Company>>({
        name: '',
        category: 'Dienstleistung',
        description: '',
        descriptionLong: '',
        address: '',
        websiteUrl: '',
        phone: '',
        whatsapp: '',
        email: '',
        isPremium: false,
        image: '',
        gallery: [],
        coordinates: [51.2721, 9.9834],
        openingHours: {
            Mo: '09:00-18:00',
            Di: '09:00-18:00',
            Mi: '09:00-18:00',
            Do: '09:00-18:00',
            Fr: '09:00-18:00',
            Sa: 'Geschlossen',
            So: 'Geschlossen'
        }
    });

    useEffect(() => {
        if (company) {
            setFormData(company);
        }
    }, [company]);

    const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !onUpload) return;

        try {
            setIsUploading(true);
            const url = await onUpload(file, 'hero');
            setFormData({ ...formData, image: url });
        } catch (err: unknown) {
            alert('Upload fehlgeschlagen: ' + (err instanceof Error ? err.message : 'Unbekannter Fehler'));
        } finally {
            setIsUploading(false);
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0 || !onUpload) return;

        try {
            setIsUploading(true);
            const urls = await Promise.all(files.map(f => onUpload(f, 'gallery')));
            setFormData({ ...formData, gallery: [...(formData.gallery || []), ...urls] });
        } catch (err: unknown) {
            alert('Galerie-Upload fehlgeschlagen: ' + (err instanceof Error ? err.message : 'Unbekannter Fehler'));
        } finally {
            setIsUploading(false);
        }
    };

    const removeGalleryImage = (url: string) => {
        setFormData({ ...formData, gallery: (formData.gallery || []).filter(item => item !== url) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            {company ? 'Firma bearbeiten' : 'Neue Firma anlegen'}
                        </h2>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Stammdaten & Details</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={24} className="text-slate-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="overflow-y-auto p-8 space-y-8 flex-1 custom-scrollbar text-left font-sans">
                    {/* Media Section */}
                    <section className="space-y-4">
                        <h3 className="text-[10px] font-black text-accent uppercase tracking-widest">Bilder & Design</h3>
                        <div className="space-y-6">
                            {/* Hero Image */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-tighter block text-left">Titelbild (Hero)</label>
                                <div className="flex items-start gap-4">
                                    {formData.image ? (
                                        <div className="relative w-32 h-20 rounded-xl overflow-hidden group">
                                            <img src={formData.image} className="w-full h-full object-cover" alt="Hero" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: '' })}
                                                className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="w-32 h-20 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                                            <Camera size={20} className="text-slate-300" />
                                            <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Hochladen</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleHeroUpload} />
                                        </label>
                                    )}
                                    <div className="text-[10px] text-slate-400 max-w-[200px] mt-2">
                                        Empfohlen: 1200x800px. Dieses Bild erscheint groß oben auf der Detailseite.
                                    </div>
                                </div>
                            </div>

                            {/* Gallery */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-tighter block text-left">Bildergalerie</label>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                    {(formData.gallery || []).map(url => (
                                        <div key={url} className="relative aspect-video rounded-lg overflow-hidden group border border-slate-100">
                                            <img src={url} className="w-full h-full object-cover" alt="Gallery" />
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryImage(url)}
                                                className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    <label className="aspect-video border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                                        <Plus size={16} className="text-slate-300" />
                                        <input type="file" className="hidden" accept="image/*" multiple onChange={handleGalleryUpload} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Basic Info */}
                    <section className="space-y-4">
                        <h3 className="text-[10px] font-black text-accent uppercase tracking-widest text-left">Basis-Informationen</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5 col-span-2">
                                <label htmlFor="companyName" className="text-xs font-black text-slate-400 uppercase tracking-tighter block text-left">Name des Unternehmens</label>
                                <input
                                    id="companyName"
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold text-slate-900"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="companyCategory" className="text-xs font-black text-slate-400 uppercase tracking-tighter block text-left">Kategorie</label>
                                <select
                                    id="companyCategory"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold text-slate-900"
                                >
                                    <option value="Gastronomie">Gastronomie</option>
                                    <option value="Friseure">Friseure</option>
                                    <option value="Handwerk">Handwerk</option>
                                    <option value="Dienstleistung">Dienstleistung</option>
                                </select>
                            </div>
                            <div className="space-y-1.5 flex items-end">
                                <label className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl w-full cursor-pointer hover:bg-slate-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={formData.isPremium}
                                        onChange={e => setFormData({ ...formData, isPremium: e.target.checked })}
                                        className="w-5 h-5 rounded border-slate-200 text-accent focus:ring-accent"
                                    />
                                    <span className="text-sm font-black text-slate-700 uppercase tracking-tighter flex items-center gap-2">
                                        <Star size={14} className={formData.isPremium ? "text-accent fill-accent" : "text-slate-400"} />
                                        Premium-Status
                                    </span>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Contact & Location */}
                    <section className="space-y-4">
                        <h3 className="text-[10px] font-black text-accent uppercase tracking-widest text-left">Kontakt & Standort</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5 col-span-2">
                                <label htmlFor="companyAddress" className="text-xs font-black text-slate-400 uppercase tracking-tighter block text-left">Adresse</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="companyAddress"
                                        required
                                        type="text"
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="companyWebsite" className="text-xs font-black text-slate-400 uppercase tracking-tighter block text-left">Website URL</label>
                                <div className="relative">
                                    <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="companyWebsite"
                                        type="url"
                                        value={formData.websiteUrl}
                                        onChange={e => setFormData({ ...formData, websiteUrl: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="companyPhone" className="text-xs font-black text-slate-400 uppercase tracking-tighter block text-left">Telefon</label>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="companyPhone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="companyWhatsapp" className="text-xs font-black text-slate-400 uppercase tracking-tighter block text-left">WhatsApp (ohne +)</label>
                                <div className="relative">
                                    <MessageCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="companyWhatsapp"
                                        type="text"
                                        value={formData.whatsapp}
                                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="companyEmail" className="text-xs font-black text-slate-400 uppercase tracking-tighter block text-left">E-Mail</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="companyEmail"
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Descriptions */}
                    <section className="space-y-4">
                        <h3 className="text-[10px] font-black text-accent uppercase tracking-widest text-left">Texte & Beschreibungen</h3>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="companyDescShort" className="text-xs font-black text-slate-400 uppercase tracking-tighter block text-left">Kurzbeschreibung (Liste)</label>
                                <textarea
                                    id="companyDescShort"
                                    required
                                    rows={2}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold text-slate-900"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="companyDescLong" className="text-xs font-black text-slate-400 uppercase tracking-tighter block text-left">Ausführliche Beschreibung (Detail Ansicht)</label>
                                <textarea
                                    id="companyDescLong"
                                    rows={4}
                                    value={formData.descriptionLong}
                                    onChange={e => setFormData({ ...formData, descriptionLong: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold text-slate-900"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Opening Hours */}
                    <section className="space-y-4 pb-4">
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-accent" />
                            <h3 className="text-[10px] font-black text-accent uppercase tracking-widest text-left">Öffnungszeiten</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {Object.keys(formData.openingHours || {}).map(day => (
                                <div key={day} className="space-y-1">
                                    <label htmlFor={`hours-${day}`} className="text-[10px] font-black text-slate-400 uppercase text-left block">{day}</label>
                                    <input
                                        id={`hours-${day}`}
                                        type="text"
                                        value={formData.openingHours?.[day as keyof typeof formData.openingHours]}
                                        onChange={e => setFormData({
                                            ...formData,
                                            openingHours: {
                                                ...formData.openingHours,
                                                [day]: e.target.value
                                            } as Company['openingHours']
                                        })}
                                        className="w-full bg-slate-50 border border-slate-100 px-2 py-2 rounded-lg text-xs font-bold text-slate-900"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                </form>

                <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 sticky bottom-0">
                    {isUploading && (
                        <div className="mr-auto flex items-center gap-2 text-xs font-black text-accent uppercase tracking-widest animate-pulse">
                            <Plus className="animate-spin" size={14} />
                            Upload läuft...
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-black text-sm text-slate-500 hover:bg-slate-200 transition-all uppercase tracking-widest"
                    >
                        Abbrechen
                    </button>
                    <button
                        disabled={isUploading}
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-sm shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50 disabled:scale-100"
                    >
                        <Save size={18} />
                        Speichern
                    </button>
                </div>
            </div>
        </div>
    );
};
