import {
  CreateAppointmentParams,
  CreateUserParams,
  RegisterUserParams,
  UpdateAppointmentParams,
} from "@/types/index";
import { Client, Users, Storage, Databases } from "node-appwrite";
import { Query, ID } from "node-appwrite";
import { formatDateTime, parseStringify } from "../utils";

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

import { Status } from "@/types";
import { Appointment } from "@/types/appwrite";
import { revalidatePath } from "next/cache";
import { messaging } from "../appwrite.conf";
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
  .setKey(process.env.NEXT_PUBLIC_API_KEY!);

const users = new Users(client);
const storage = new Storage(client);
const databases = new Databases(client);
declare interface appointmentsType {
  documents: Appointment[];
  scheduled: number;
  pending: number;
  cancelled: number;
  totalCount: number;
}
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

export const getRecentAppointmentList = async () => {
  const statusCounter = {
    scheduled: 0,
    pending: 0,
    cancelled: 0,
  };
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    const counts = (response.documents as Appointment[]).reduce(
      (accumulator, appointment) => {
        if (appointment.status === "scheduled") accumulator.scheduled += 1;
        else if (appointment.status === "pending") accumulator.pending += 1;
        else if (appointment.status === "cancelled") accumulator.cancelled += 1;

        return accumulator;
      },
      statusCounter
    );

    const data = {
      totalCount: response.total,
      ...counts,
      documents: response.documents,
    };

    return data;
  } catch (error) {
    console.error(error);
  }
};
// result.forEach((item: CreateAppointmentParams) => {
//   if (item.status in statusCounter) {
//     statusCounter[item.status]++;
//   }
// });

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    //TODO SMS notification
    const smsMessage = `Hi, it's Charles. ${
      type === "schedule"
        ? `Your appointment has been scheduled for ${
            formatDateTime(appointment.schedule!).dateTime
          } with Dr.${appointment.primaryPhysician}.`
        : `Your appointment has been cancelled, Reason ${appointment.cancellationReason}`
    }`;
    await sendSMSNotifications(userId, smsMessage);
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const sendSMSNotifications = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
  } catch (error) {
    console.log(error);
  }
};
