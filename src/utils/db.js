/**
 * @fileoverview MongoDB connection utilities.
 * @module db/mongoose
 */

import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

/**
 * Represents the state of the MongoDB connection.
 * @typedef {Object} MongoConnectionState
 * @property {number} isConnected - The connection status: 0 (disconnected), 1 (connected), 2 (connecting), 3 (disconnecting), or 4 (uninitialized).
 */

/**
 * Represents the MongoDB connection state.
 * @type {MongoConnectionState}
 */
const mongoConnection = {
  isConnected: 0,
};

/**
 * Connects to the MongoDB database using the provided MONGO_URL.
 * @function
 * @async
 * @throws {Error} - If the connection attempt fails.
 */
export const dbConnect = async () => {
 // console.log('MONGO_URL', MONGO_URL);
  if (mongoConnection.isConnected === 1) {
    console.log('Connection already established');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log('Already connected');
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(MONGO_URL ?? '');
  mongoConnection.isConnected = 1;
  console.log('Connected to MongoDB', MONGO_URL ?? '');
};

/**
 * Disconnects from the MongoDB database.
 * @function
 * @async
 * @throws {Error} - If the disconnection attempt fails.
 */
export const dbDisconnect = async () => {
  if (process.env.NODE_ENV === 'development') return;
  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log('Disconnected from MongoDB');
};
