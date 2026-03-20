export interface Company {
    id: string;
    name: string;
    category: string;
    address: string;
    phone: string;
    whatsapp: string;
    email?: string;
    websiteUrl: string;
    description: string;
    descriptionLong?: string;
    image?: string;
    gallery?: string[];
    isPremium: boolean;
    coordinates: [number, number];
    openingHours: { [key: string]: string };
}

export const companies: Company[] = [
    {
        id: '1',
        name: 'Gasthaus zum Schwan',
        category: 'Gastronomie',
        description: 'Traditionelle hessische Küche im Herzen von Bad Sooden-Allendorf.',
        descriptionLong: 'Willkommen im Gasthaus zum Schwan. Seit Generationen bieten wir unseren Gästen feinste hessische Spezialitäten in gemütlicher Atmosphäre. Entdecken Sie unsere berühmte Grüne Soße, zarte Wildgerichte aus heimischer Jagd und saisonale Köstlichkeiten. Ob im historischen Gastraum oder in unserem idyllischen Biergarten – wir freuen uns auf Ihren Besuch!',
        websiteUrl: 'https://hotel-schwan.de',
        phone: '+4956522026',
        whatsapp: '4956522026',
        email: 'info@hotel-schwan.de',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1000',
        gallery: [
            'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800'
        ],
        coordinates: [51.2721, 9.9834],
        openingHours: {
            "0": "11:30-22:00", // Sonntag
            "1": "17:00-22:00",
            "2": "17:00-22:00",
            "3": "17:00-22:00",
            "4": "RUHETAG",
            "5": "17:00-22:00",
            "6": "11:30-22:00"
        },
        isPremium: true,
        address: 'Kirchplatz 2, 37242 Bad Sooden-Allendorf'
    },
    {
        id: '2',
        name: 'Friseur Schnittpunkt',
        category: 'Friseure',
        description: 'Ihr Experte für moderne Haarschnitte und Farben.',
        websiteUrl: 'https://schnittpunkt-bsa.de',
        phone: '+4956521234',
        whatsapp: '4956521234',
        coordinates: [51.2715, 9.9825],
        openingHours: {
            "1": "09:00-18:00",
            "2": "09:00-18:00",
            "3": "09:00-18:00",
            "4": "09:00-18:00",
            "5": "09:00-18:00",
            "6": "08:00-13:00"
        },
        isPremium: false,
        address: 'Werrastraße 10, 37242 Bad Sooden-Allendorf'
    },
    {
        id: '3',
        name: 'Elektro Meyer',
        category: 'Handwerk',
        description: 'Elektroinstallationen und Reparaturen aller Art.',
        websiteUrl: 'https://elektro-meyer.de',
        phone: '+4956529988',
        whatsapp: '4956529988',
        coordinates: [51.2730, 9.9850],
        openingHours: {
            "1": "08:00-16:00",
            "2": "08:00-16:00",
            "3": "08:00-16:00",
            "4": "08:00-16:00",
            "5": "08:00-14:00"
        },
        isPremium: true,
        address: 'Industriestraße 5, 37242 Bad Sooden-Allendorf'
    },
    {
        id: '4',
        name: 'Cafe am Markt',
        category: 'Gastronomie',
        description: 'Frischer Kuchen und Kaffeespezialitäten.',
        websiteUrl: 'https://cafe-am-markt.de',
        phone: '+4956524455',
        whatsapp: '4956524455',
        coordinates: [51.2718, 9.9820],
        openingHours: {
            "0": "13:00-18:00",
            "2": "09:00-18:00",
            "3": "09:00-18:00",
            "4": "09:00-18:00",
            "5": "09:00-18:00",
            "6": "09:00-18:00"
        },
        isPremium: false,
        address: 'Marktplatz 1, 37242 Bad Sooden-Allendorf'
    }
];
