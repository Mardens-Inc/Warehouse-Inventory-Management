import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

interface POInventoryViewModalContextType
{
    pOInventoryViewModal: string | null;
    setPOInventoryViewModal: Dispatch<SetStateAction<string | null>>;
}

const POInventoryViewModalContext = createContext<POInventoryViewModalContextType | undefined>(undefined);

export function POInventoryViewModalProvider({children}: { children: ReactNode })
{
    const [pOInventoryViewModal, setPOInventoryViewModal] = useState<string | null>(null);

    return (
        <POInventoryViewModalContext.Provider value={{pOInventoryViewModal, setPOInventoryViewModal}}>
            {children}
        </POInventoryViewModalContext.Provider>
    );
}

export function usePOInventoryViewModal(): POInventoryViewModalContextType
{
    const context = useContext(POInventoryViewModalContext);
    if (!context)
    {
        throw new Error("usePOInventoryViewModal must be used within a POInventoryViewModalProvider");
    }
    return context;
}