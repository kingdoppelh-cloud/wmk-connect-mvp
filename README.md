# WMK Connect - Regionales Firmenverzeichnis MVP

Dieses Projekt ist ein voll funktionsfähiger Prototyp einer Progressive Web App (PWA) für das Firmenverzeichnis des Werra-Meißner-Kreises, speziell Bad Sooden-Allendorf.

## 🚀 Features

- **Entdecken-Seite**: Durchsuchen Sie lokale Unternehmen mit einer Echtzeit-Suche und Kategorie-Filtern.
- **Premium-Listing**: Hervorgehobene Unternehmen mit speziellen Badges und Top-Platzierung.
- **Interaktive Karte**: Basierend auf Leaflet, mit allen Firmenstandorten und speziellen Premium-Pins.
- **Quick-Actions**: Direkte Verlinkung zu Websites, Telefon-Dialer und WhatsApp.
- **Favoriten**: Speichern Sie Ihre liebsten Unternehmen lokal in Ihrem Browser.
- **Geöffnet/Geschlossen Status**: Automatische Berechnung basierend auf den aktuellen Öffnungszeiten.
- **Native Sharing**: Nutzen Sie die Web Share API, um Einträge zu teilen.

## 🛠 Tech-Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS V4 (Modern CSS-first approach)
- **Animationen**: Framer Motion
- **Icons**: Lucide React
- **Karten**: Leaflet + React-Leaflet
- **PWA**: Vite-Plugin-PWA

## ⚙️ Installation & Start

1. **Abhängigkeiten installieren**:
   ```bash
   npm install --legacy-peer-deps
   ```
   *(Hinweis: --legacy-peer-deps ist aktuell für die PWA-Plugin-Kompatibilität mit Vite 8 erforderlich)*

2. **Entwicklungsserver starten**:
   ```bash
   npm run dev
   ```

3. **Produktions-Build**:
   ```bash
   npm run build
   ```

## 📊 Eigene Daten verwenden

Um die Dummy-Daten durch echte Unternehmensdaten zu ersetzen:

1. Öffnen Sie `src/data/companies.ts`.
2. Bearbeiten Sie das `companies`-Array oder laden Sie dort eine externe JSON-Datei.
3. Die Struktur muss dem `Company`-Interface entsprechen:
   ```typescript
   interface Company {
     id: string;
     name: string;
     category: string;
     description: string;
     websiteUrl: string;
     phone: string;
     whatsapp: string;
     coordinates: [number, number];
     openingHours: { [dayIndex: string]: string };
     isPremium: boolean;
     address: string;
   }
   ```

## 🎨 Branding anpassen

- Die **Akzentfarbe** kann in `src/index.css` im `@theme` Block unter `--color-accent` geändert werden.
- Das **Logo** ist ein Platzhalter in `src/components/Layout.tsx`. Tauschen Sie das WMK-Div gegen ein `<img>` Tag aus.

Entwickelt für den Werra-Meißner-Kreis. 🦅
