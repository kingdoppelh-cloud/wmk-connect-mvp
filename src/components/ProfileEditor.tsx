import React, { useState, useEffect } from 'react';
import { X, User, Briefcase, Plus, Save, Sparkles, RefreshCw } from 'lucide-react';
import { useProfile, type Profile } from '../hooks/useProfile';
import { cn } from '../utils/cn';

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
        } catch {
            alert('Fehler beim Speichern');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
            <div className="bg-surface-container-lowest dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative z-10 animate-in zoom-in-95 duration-300">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4 sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl z-20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-primary dark:text-white tracking-tight flex items-center gap-2">
                                <Sparkles className="text-secondary" size={24} />
                                Profil Setup
                            </h2>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Zeig, was du kannst</p>
                        </div>
                        <button onClick={onClose} className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                            <X size={20} className="text-primary dark:text-slate-300" />
                        </button>
                    </div>
                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="text-primary dark:text-slate-300">Profilstärke</span>
                            <span className="text-secondary">{
                                [formData.full_name, formData.bio, formData.skills?.length, formData.user_type].filter(Boolean).length * 25
                            }%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                                style={{ width: `${[formData.full_name, formData.bio, formData.skills?.length, formData.user_type].filter(Boolean).length * 25}%` }}
                            />
                        </div>
                        {([formData.full_name, formData.bio, formData.skills?.length, formData.user_type].filter(Boolean).length * 25) < 100 && (
                            <p className="text-xs text-slate-500 font-medium italic">💡 Vervollständige dein Profil für 3x mehr Anfragen.</p>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 text-left bg-surface-container-lowest dark:bg-slate-900">
                    {/* User Type Selection */}
                    <div className="space-y-3 bg-surface-container-low dark:bg-slate-800/50 p-6 rounded-2xl">
                        <label className="text-[10px] font-black text-primary dark:text-slate-300 uppercase tracking-widest block">Ich bin...</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setFormData({ ...formData, user_type: 'handyman' })}
                                className={cn(
                                    "flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bold text-sm",
                                    formData.user_type === 'handyman' ? "border-primary bg-primary text-white scale-105 shadow-lg" : "border-transparent bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                )}
                            >
                                <User size={18} /> Handwerker
                            </button>
                            <button
                                onClick={() => setFormData({ ...formData, user_type: 'company' })}
                                className={cn(
                                    "flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bold text-sm",
                                    formData.user_type === 'company' ? "border-primary bg-primary text-white scale-105 shadow-lg" : "border-transparent bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                )}
                            >
                                <Briefcase size={18} /> Unternehmen
                            </button>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <label htmlFor="full_name" className="text-[10px] font-black text-primary dark:text-slate-300 uppercase tracking-widest">Vollständiger Name</label>
                        <input
                            id="full_name"
                            type="text"
                            value={formData.full_name || ''}
                            onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                            placeholder="z.B. Max Mustermann"
                            className="w-full bg-surface-container-low dark:bg-slate-800 border-none px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-primary dark:text-white placeholder:text-slate-400"
                        />
                    </div>

                    {/* Bio / Biography */}
                    <div className="space-y-2">
                        <label htmlFor="bio" className="text-[10px] font-black text-primary dark:text-slate-300 uppercase tracking-widest">Biografie / Erfahrung</label>
                        <textarea
                            id="bio"
                            rows={4}
                            value={formData.bio || ''}
                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                            placeholder="Beschreibe kurz deine Erfahrung und was du suchst..."
                            className="w-full bg-surface-container-low dark:bg-slate-800 border-none px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700 dark:text-slate-200 resize-none placeholder:text-slate-400"
                        />
                        <p className="text-[9px] text-secondary dark:text-red-400 font-bold uppercase tracking-widest">* Diese Information wird von der KI genutzt, um passende Jobs für dich zu finden.</p>
                    </div>

                    {/* Skills */}
                    <div className="space-y-3 bg-surface-container-low dark:bg-slate-800/50 p-6 rounded-2xl">
                        <label className="text-[10px] font-black text-primary dark:text-slate-300 uppercase tracking-widest block">Fähigkeiten & Tags</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.skills?.map(skill => (
                                <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary dark:bg-slate-700 text-white rounded-full text-xs font-black uppercase tracking-tighter shadow-sm animate-in fade-in zoom-in-90 duration-300">
                                    {skill}
                                    <button onClick={() => removeSkill(skill)} className="hover:text-red-400 transition-colors"><X size={12} /></button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                id="new_skill"
                                type="text"
                                value={newSkill}
                                onChange={e => setNewSkill(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && addSkill()}
                                placeholder="z.B. Sanitär, Heizung..."
                                className="flex-1 bg-white dark:bg-slate-800 border-none px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-primary dark:text-white placeholder:text-slate-400"
                                aria-label="Neue Fähigkeit hinzufügen"
                            />
                            <button
                                onClick={addSkill}
                                className="p-4 bg-secondary text-white rounded-xl hover:bg-red-700 transition-colors shadow-md"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl flex items-center justify-end gap-4 sticky bottom-0 z-20">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all uppercase tracking-widest"
                    >
                        Abbrechen
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isLoading}
                        className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-black text-sm shadow-xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50 disabled:scale-100"
                    >
                        {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                        Profil Speichern
                    </button>
                </div>
            </div>
        </div>
    );
};
