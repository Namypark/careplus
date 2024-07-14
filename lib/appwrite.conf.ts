// appwrite.conf.ts
"use server";
import { Client, Databases, Storage, Messaging, Users } from "node-appwrite";

export const {
  NEXT_PUBLIC_PROJECT_ID: PROJECT_ID,
  NEXT_PUBLIC_API_KEY: API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  throw new Error("Appwrite environment variables are not set");
}

const client = new Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const messaging = new Messaging(client);
export const users = new Users(client);

console.log(users); // Add this line to log the users object
