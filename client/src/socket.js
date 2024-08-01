import { io } from 'socket.io-client';

const socket = io.connect(import.meta.env.VITE_SERVER_ADDRESS);

export default socket;
