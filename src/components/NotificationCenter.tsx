import React from 'react';
import { Bell, X, Calendar, Newspaper, CheckCircle2, ArrowRight, Ghost } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import type { Notification } from '../hooks/useNotifications';
import { cn } from '../utils/cn';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAction: (tab: string) => void;
}

export const NotificationCenter: React.FC<Props> = ({ isOpen, onClose, onAction }) => {
    const { notifications, unreadCount, markAsRead, markAllAsRead, isLoading } = useNotifications();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Bell size={24} className="text-slate-900" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Mitteilungen</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                {/* Actions */}
                {unreadCount > 0 && (
                    <div className="px-6 py-3 bg-white border-b border-slate-100 flex justify-end">
                        <button
                            onClick={markAllAsRead}
                            className="text-[10px] font-black text-accent uppercase tracking-widest flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                        >
                            <CheckCircle2 size={12} /> Alle gelesen
                        </button>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-300 gap-4">
                            <div className="w-8 h-8 border-4 border-slate-100 border-t-accent rounded-full animate-spin"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Lade Updates...</span>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-300 gap-6 opacity-60">
                            <Ghost size={48} strokeWidth={1.5} />
                            <div className="text-center">
                                <p className="text-sm font-bold text-slate-500">Noch keine Nachrichten</p>
                                <p className="text-[10px] uppercase font-black tracking-widest mt-1">Folge Firmen für Updates!</p>
                            </div>
                        </div>
                    ) : (
                        notifications.map((n) => (
                            <NotificationItem
                                key={n.id}
                                notification={n}
                                onClick={() => {
                                    markAsRead(n.id);
                                    onAction(n.link);
                                    onClose();
                                }}
                            />
                        ))
                    )}
                </div>

                {/* Footer Tip */}
                <div className="p-6 bg-slate-50 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold text-center leading-relaxed">
                        Tipp: Aktiviere Push-Benachrichtigungen in deinem Profil, um nichts zu verpassen.
                    </p>
                </div>
            </div>
        </div>
    );
};

const NotificationItem: React.FC<{
    notification: Notification,
    onClick: () => void
}> = ({ notification, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "group p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden",
                notification.is_read
                    ? "bg-white border-slate-100 opacity-60"
                    : "bg-white border-slate-100 shadow-lg shadow-slate-900/5 hover:border-accent/30"
            )}
        >
            {!notification.is_read && (
                <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
            )}

            <div className="flex gap-4">
                {/* Logo / Icon */}
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    {notification.type === 'event' ? (
                        <Calendar size={20} className="text-accent" />
                    ) : (
                        <Newspaper size={20} className="text-slate-900" />
                    )}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest truncate">
                            {notification.company?.name || 'Partner-Update'}
                        </span>
                        <span className="text-[8px] font-bold text-slate-300">
                            {new Date(notification.created_at).toLocaleDateString('de-DE')}
                        </span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900 mb-1 leading-snug">{notification.title}</h4>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                        {notification.content}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        Details ansehen <ArrowRight size={10} />
                    </div>
                </div>
            </div>
        </div>
    );
};
