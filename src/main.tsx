import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ErrorBoundary } from './components/ErrorBoundary'; // Added import for ErrorBoundary
import './index.css'
import App from './App.tsx'

console.log('Mounting React application...');
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary> {/* Wrapped the entire application with ErrorBoundary */}
      <BrowserRouter>
        <AuthProvider>
          <UIProvider>
            <FavoritesProvider>
              <App />
              <Analytics />
              <SpeedInsights />
            </FavoritesProvider>
          </UIProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
console.log('Render called.');
