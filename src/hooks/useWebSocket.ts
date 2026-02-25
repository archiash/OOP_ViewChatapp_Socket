import {
    Client,
    type Message,
    type StompSubscription
} from "@stomp/stompjs";
import SockJS from "sockjs-client"
import { useWebsocketContext } from "../context/websocketContext";
import { API_BASE } from "../api";

export const useWebSocket = () => {
    const { client, isConnected, setClient, setIsConnected } = useWebsocketContext();
    const serverUrl = API_BASE

    const subscribe = (
        destination: string,
        callback: (payload: Message) => any
    ) => {
        if (client && isConnected) {
            const subscription: StompSubscription = client.subscribe(destination, callback, { ack: 'client' });
            console.log(`Subscribed to ${destination}`);
            return subscription;
        } else {
            console.log("No active WebSocket connection to disconnect.");
        }
    };

    const unsubscribe = (destination: string) => {
        if (client && isConnected) {
            client.unsubscribe(destination);
            console.log(`Unsubscribed from ${destination}`);
        } else {
            console.log("No active WebSocket connection to disconnect.");
        }
    };

    const sendMessage = (destination: string, message: any) => {
        if (client && isConnected) {
            console.log("send", JSON.stringify(message));
            client.publish({
                destination: `/app${destination}`,
                body: JSON.stringify(message),
            });
        } else {
            console.log("No active WebSocket connection to disconect.");
        }
    };

    const connect = (uuid: string) => {
        console.log(serverUrl)
        try {
            const stompClient = new Client({
                webSocketFactory: () => new SockJS(`${serverUrl}/ws?uuid=${uuid}`),
                onConnect: () => onConnected(stompClient),
                onDisconnect: () => disconnect(),
                reconnectDelay: 2000,
            });

            console.log("connected");
            stompClient.activate();
        } catch (e) {
            console.log(e);
        }
    };
    const disconnect = () => {
        if (client && isConnected) {
            setClient(null);
            setIsConnected(false);
            console.log("WebSocket disconnected");
        } else {
            console.log("No active WebSocket connection to disconnect.");
        }
    };

    const onConnected = (stompClient: Client) => {
        setClient(stompClient);
        setIsConnected(true);
        console.log("WebSocket connected successfully");
    };

    return {
        client,
        isConnected,
        connect,
        disconnect,
        sendMessage,
        subscribe,
        unsubscribe,
    };
};