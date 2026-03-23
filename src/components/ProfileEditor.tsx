import React, { useState, useEffect } from 'react';
import { X, User, Briefcase, Plus, Save, Sparkles, RefreshCw } from 'lucide-react';
import { useProfile, type Profile } from '../hooks/useProfile';
import { cn } from './Layout';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const ProfileEditor: React.FC<Props> = ({ isOpen, onClose }) => {
    const { profile, isLoading, updateProfile } = useProfile();
    const [formData, setFormData] = useState<Partial<Profile>>({
        full_name: '',
        bio: '',
        skills: [],
        user_type: 'handyman'
    });
    const [newSkill, setNewSkill] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (profile) {
            setFormData({
                full_name: profile.full_name || '',
                bio: profile.bio || '',
                skills: profile.skills || [],
                user_type: profile.user_type || 'handyman'
            });
        }
    }, [profile]);

    const addSkill = () => {
        if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
            setFormData({
                ...formData,
                skills: [...(formData.skills || []), newSkill.trim()]
            });
            setNewSkill('');
        }
    };

    const removeSkill = (skill: string) => {
        setFormData({
            ...formData,
            skills: (formData.skills || []).filter(s => s !== skill)
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateProfile(formData);
            onClose();
        } catch (err) {
            alert('Fehler beim Speichern');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative z-10 animate-in zoom-in-95 duration-200">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-20">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <Sparkles className="text-accent" size={20} />
                            KI-Profil optimieren
                        </h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Für besseres Job-Matching</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={24} className="text-slate-400" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-6 text-left">
                    {/* User Type Selection */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Ich bin...</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setFormData({ ...formData, user_type: 'handyman' })}
                                className={cn(
                                    "flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all font-bold text-sm",
                                    formData.user_type === 'handyman' ? "border-accent bg-accent/5 text-accent" : "border-slate-100 text-slate-400"
                                )}
                            >
                                <User size={18} /> Handwerker
                            </button>
                            <button
                                onClick={() => setFormData({ ...formData, user_type: 'company' })}
                                className={cn(
                                    "flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all font-bold text-sm",
                                    formData.user_type === 'company' ? "border-accent bg-accent/5 text-accent" : "border-slate-100 text-slate-400"
                                )}
                            >
                                <Briefcase size={18} /> Unternehmen
                            </button>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vollständiger Name</label>
                        <input
                            type="text"
                            value={formData.full_name || ''}
                            onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                            placeholder="z.B. Max Mustermann"
                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold text-slate-900"
                        />
                    </div>

                    {/* Bio / Biography */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Biografie / Erfahrung</label>
                        <textarea
                            rows={4}
                            value={formData.bio || ''}
                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                            placeholder="Beschreibe kurz deine Erfahrung und was du suchst..."
                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-medium text-slate-700 resize-none"
                        />
                        <p className="text-[9px] text-slate-400 italic">* Diese Information wird von der KI genutzt, um passende Jobs für dich zu finden.</p>
                    </div>

                    {/* Skills */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Fähigkeiten & Tags</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.skills?.map(skill => (
                                <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-tighter shadow-sm animate-in fade-in zoom-in-90 duration-300">
                                    {skill}
                                    <button onClick={() => removeSkill(skill)} className="hover:text-accent transition-colors"><X size={12} /></button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={e => setNewSkill(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && addSkill()}
                                placeholder="z.B. Sanitär, Heizung..."
                                className="flex-1 bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold text-slate-900"
                            />
                            <button
                                onClick={addSkill}
                                className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-black transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 sticky bottom-0 z-20">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-black text-sm text-slate-500 hover:bg-slate-200 transition-all uppercase tracking-widest"
                    >
                        Abbrechen
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isLoading}
                        className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-sm shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50 disabled:scale-100"
                    >
                        {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                        Profil Speichern
                    </button>
                </div>
            </div>
        </div>
    );
};
