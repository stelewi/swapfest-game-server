import GameServer from "./src/Core/GameServer.js";
import 'dotenv/config.js';


const config = {
    port: process.env.GAME_SERVER_PORT,
    corsOrigins: process.env.CORS_ORIGINS.split(',')
}

const gameServer = new GameServer(config);
gameServer.start();