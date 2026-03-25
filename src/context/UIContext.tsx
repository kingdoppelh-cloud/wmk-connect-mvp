import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
    showImpressum: boolean;
    setShowImpressum: (show: boolean) => void;
    showDatenschutz: boolean;
    setShowDatenschutz: (show: boolean) => void;
    showPartnerBenefits: boolean;
    setShowPartnerBenefits: (show: boolean) => void;
    showProfileEditor: boolean;
    setShowProfileEditor: (show: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showImpressum, setShowImpressum] = useState(false);
    const [showDatenschutz, setShowDatenschutz] = useState(false);
    const [showPartnerBenefits, setShowPartnerBenefits] = useState(false);
    const [showProfileEditor, setShowProfileEditor] = useState(false);

    return (
        <UIContext.Provider value={{
            showImpressum, setShowImpressum,
            showDatenschutz, setShowDatenschutz,
            showPartnerBenefits, setShowPartnerBenefits,
            showProfileEditor, setShowProfileEditor
        }}>
            {children}
        </UIContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUI = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
