// appwrite.conf.ts
"use server";
import { Client, Databases, Storage, Messaging, Users } from "node-appwrite";

export const {
  NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_API_KEY,
  NEXT_PUBLIC_DATABASE_ID,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID,
  NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
  NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_ID,
  NEXT_PUBLIC_ENDPOINT,
} = process.env;

if (!NEXT_PUBLIC_ENDPOINT || !NEXT_PUBLIC_PROJECT_ID || !NEXT_PUBLIC_API_KEY) {
  throw new Error("Appwrite environment variables are not set");
}

const client = new Client();
client
  .setEndpoint(NEXT_PUBLIC_ENDPOINT!)
  .setProject(NEXT_PUBLIC_PROJECT_ID!)
  .setKey(NEXT_PUBLIC_API_KEY!);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const messaging = new Messaging(client);
export const users = new Users(client);

console.log(users); // Add this line to log the users object
