import mongoose, { ConnectionStates } from "mongoose";

export let connectionState: ConnectionStates
export function createSyncMongoConnect() {
    console.log(process.env.DATABASE_URL)
    const conn = mongoose.createConnection(String(process.env.DATABASE_URL), {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 segundos
        socketTimeoutMS: 45000, // 45 segundos
        // poolSize: 10 // ajuste conforme necessário
    });
    connectionState = conn.readyState
    return conn
}

export async function checkConnectionStatus() {
    const conn = await mongoose.createConnection(String(process.env.DATABASE_URL)).asPromise();
    return conn.readyState
}