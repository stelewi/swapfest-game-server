import { createServer } from 'http';
import { Server } from "socket.io";
import ConnectionManager from "./ConnectionManager.js";

export default class GameServer {

    /**
     *
     * @param {string} port
     * @param {string[]} corsOrigins
     */
    constructor({port, corsOrigins}) {
        this.port = port
        this.corsOrigins = corsOrigins
        this._io = null;
    }

    start() {
        console.log("Starting game server...");
        const httpServer = createServer();
        this._io = new Server(httpServer, {
            cors: {
                origin: this.corsOrigins
            }
        });

        this._io.on("connection", (socket) => {
            console.log("client connected, sending ping...");
            socket.emit('ping');
            socket.on('pong', () => {
                console.log("received pong from client...");
            })
        });

        console.log("Listening on port: " + this.port);
        this._io.listen(this.port);
    }


    get io() {
        return this._io;
    }
}