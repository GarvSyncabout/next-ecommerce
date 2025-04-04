"use server";

// import mongoose from "mongoose";

// async function connectToMongo() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// }

// export default connectToMongo;






import { MongoClient } from "mongodb";

// Set your MongoDB URI (replace with your actual URI)
const MONGODB_URI = process.env.MONGODB_URI || "";

// Database name (can be changed according to your requirement)
const DB_NAME = process.env.MONGODB_DB || "";

// Create a MongoClient connection (singleton pattern)
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to ensure the MongoClient isn't created multiple times
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
    clientPromise = global._mongoClientPromise;
  }
} else {
  // In production mode, it's safe to just use the client without caching it globally
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

const getClient = async () => {
  const client = await clientPromise;
  return client;
}

export default getClient; 
