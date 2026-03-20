export const isOpen = (openingHours: { [key: string]: string }): boolean => {
    const now = new Date();
    const day = now.getDay().toString(); // 0 (Sunday) to 6 (Saturday)
    const hours = openingHours[day];

    if (!hours || hours === 'RUHETAG') return false;

    const [start, end] = hours.split('-');
    if (!start || !end) return false;

    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    const startTime = new Date();
    startTime.setHours(startH, startM, 0);

    const endTime = new Date();
    endTime.setHours(endH, endM, 0);

    // Handle cases where closing time is past midnight (e.g., 17:00-02:00)
    if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
    }

    return now >= startTime && now <= endTime;
};

export const getStatusLabel = (openingHours: { [key: string]: string }): string => {
    return isOpen(openingHours) ? '🟢 Geöffnet' : '🔴 Geschlossen';
};
