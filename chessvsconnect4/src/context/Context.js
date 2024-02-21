import {createContext,useContext} from 'react';
import socketio from "socket.io-client";
// import { SOCKET_URL } from "config";

export const socket = socketio.connect("http://127.0.0.1:5050");
export const SocketContext = createContext();

export const AppContext = createContext();
export function useAppContext() {
    return useContext(AppContext);
}

