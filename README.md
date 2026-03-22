# WMK Connect - Regionales Firmenverzeichnis v1.0

Dieses Projekt ist eine hochperformante Progressive Web App (PWA) für das Firmenverzeichnis des Werra-Meißner-Kreises. Es verbindet lokale Unternehmen mit Bürgern und bietet B2B-Tools für Händler.

## 🚀 Kern-Features

- **Entdecken & Suche**: Echtzeit-Suche und Kategorie-Filter für lokale Firmen.
- **Interaktive Karte**: GPS-basierte Entdeckung ("In der Nähe") mit benutzerdefinierten Pins.
- **Merchant Dashboard**: Eigenes Profilmanagement für Unternehmen (News, Jobs, Events).
- **Regionaler Jobmarkt**: Swipe-Interface für Stellenangebote mit WhatsApp-Direktbewerbung.
- **Activity Feed**: "Live aus der Region" – Aktuelle News und Angebote von lokalen Partnern.
- **Analytics**: Detaillierte Einblicke für Händler (Profilaufrufe, Klicks auf Tel/WA/Web).
- **Gamified Onboarding**: Fortschrittsanzeige und Checklisten für Unternehmen.

## 🛠 Tech-Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend/DB**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Styling**: Tailwind CSS V4 + Framer Motion (Animationen)
- **Infrastruktur**: Vercel (Analytics & Speed Insights)
- **PWA**: Vollständige Offline-Unterstützung und Installierbarkeit.

## ⚙️ Setup & Deployment

1. **Abhängigkeiten**: `npm install --legacy-peer-deps`
2. **Umgebungsvariablen**: `.env.local` mit `VITE_SUPABASE_URL` und `VITE_SUPABASE_ANON_KEY` erstellen.
3. **Datenbank**: SQL-Initialisierungsscripts in Supabase ausführen (siehe `supabase/` Ordner, falls vorhanden, oder über Repository-Historie).
4. **Build**: `npm run build`

## 📊 Live-Betrieb

Die App ist für den Einsatz im Werra-Meißner-Kreis optimiert. Unternehmen können sich via Magic Link einloggen, ihr Profil verwalten und Marketing-Materialien (QR-Codes) direkt im Dashboard generieren.

Entwickelt mit ❤️ für die Region. 🦅
