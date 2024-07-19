import {
  CreateAppointmentParams,
  CreateUserParams,
  RegisterUserParams,
} from "@/types/index";
import { Client, Users, Storage, Databases } from "node-appwrite";
import { Query, ID } from "node-appwrite";
import { parseStringify } from "../utils";

const {
  NEXT_PUBLIC_PROJECT_ID: PROJECT_ID,
  NEXT_PUBLIC_API_KEY: API_KEY,
  NEXT_PUBLIC_DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

// import { users } from "@/lib/appwrite.conf";
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
  .setKey(process.env.NEXT_PUBLIC_API_KEY!);

const users = new Users(client);
const storage = new Storage(client);
const databases = new Databases(client);

/****
 * @createDocument is the way we fill up the values of that particular table in this case it is th appointment table
 * it takes in the @DATABASE_ID @APPOINTMENT_COLLECTION_ID @DOCUMENT_ID
 */
export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );
    console.log(parseStringify(newAppointment));
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
    console.log(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      appointmentData
    );
  }
};
/****
 * @documentId used when sending a request using the getDocument method
 */
export const getAppointmentDetails = async (documentId: string) => {
  try {
    const response = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      documentId
    );
    // console.log(JSON.stringify(response, null, 2));
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
};
