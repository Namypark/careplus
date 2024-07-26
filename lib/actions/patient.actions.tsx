"use server";
/***
 * make sure it is on "use-server to avoid an Fs error"
 */
import { CreateUserParams, RegisterUserParams } from "@/types/index";
import { Client, Users, Storage, Databases } from "node-appwrite";
import { Query, ID } from "node-appwrite";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

// import { users } from "@/lib/appwrite.conf";
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
  .setKey(process.env.NEXT_PUBLIC_API_KEY!);

const users = new Users(client);
const storage = new Storage(client);
const databases = new Databases(client);

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      console.log(error);
      return documents?.users[0];
    }
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const result = await users.get(userId);
    return parseStringify(result);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    /***
     * @file , empty variable we check if the identificationDocument exists
     *
     *
     */
    console.log(identificationDocument);
    console.log(patient);

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID!,
        ID.unique(),
        inputFile
      );
    }
    const newPatient = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${process.env
          .NEXT_PUBLIC_ENDPOINT!}/storage/buckets/${
          process.env.NEXT_PUBLIC_BUCKET_ID
        }/files/${file?.$id}/view?project=${
          process.env.NEXT_PUBLIC_PROJECT_ID
        }`,
        ...patient,
      }
    );
    console.log(newPatient);
    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    // console.log(parseStringify(response.documents[0]));

    return parseStringify(response.documents[0]);
  } catch (error) {
    console.error(error);
  }
};
