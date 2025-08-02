import React, { createContext, useContext, useState } from "react";


const SearchCommandContext = createContext<{ isOpen: boolean; toggle: () => void; closeModal: () => void }>({
    isOpen: false,
    toggle: () => {},
    closeModal: () => {},
});

export const SearchCommandProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => setIsOpen(prev => !prev);
    const closeModal = () => setIsOpen(prev => !prev);

    return (
        <SearchCommandContext.Provider value={{ isOpen, toggle, closeModal }}>
            {children}
        </SearchCommandContext.Provider>
    )
};

export const useSearchCommand = () => useContext(SearchCommandContext);