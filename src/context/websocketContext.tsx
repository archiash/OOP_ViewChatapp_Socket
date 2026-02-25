import type { Client } from "@stomp/stompjs";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface WebsocketState {
    client: Client | null;
    isConnected: boolean;
    setClient: (client: Client | null) => void;
    setIsConnected: (isConnected: boolean) => void;
}

export const WebsocketContext = createContext<WebsocketState | null>(null);

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
    const [client, setClient] = useState<Client | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    return (
        <WebsocketContext.Provider value={{ client, isConnected, setClient, setIsConnected }}>
            {children}
        </WebsocketContext.Provider>
    );
};

export const useWebsocketContext = () => {
    const context = useContext(WebsocketContext);
    if (!context) {
        throw new Error("useWebsocketContext must be used within a WebsocketProvider");
    }
    return context;
};