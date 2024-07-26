export const GenderOptions: string[] = ["Male", "Female", "Other"];

import { Gender } from "@/types";
import { boolean, string } from "zod";

export declare interface Doctor {
  name: string;
  image: string;
}
export const Doctors: Doctor[] = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const IdentificationTypes: string[] = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

declare interface consentType<T, U> {
  name: T;
  value: U;
}
declare interface patientType<S, D, B, G> {
  firstName: S;
  lastName: S;
  name: S;
  email: S;
  phone: S;
  birthDate: D;
  gender: G;
  address: S;
  occupation: S;
  emergencyContactName: S;
  emergencyContactNumber: S;
  primaryPhysician: S;
  insuranceProvider: S;
  insurancePolicyNumber: S;
  allergies: S;
  currentMedication: S;
  familyMedicalHistory: S;
  pastMedicalHistory: S;
  identificationType: S;
  identificationNumber: S;
  identificationDocument: [];
  privacyConsent: B;
  treatmentConsent: B;
  disclosureConsent: B;
}
declare interface AppointmentFormTypes<S, D> {
  primaryPhysician: S;
  reason: S;
  notes: S;
  schedule: D;
}

export const consent: consentType<string, string>[] = [
  {
    name: "treatmentConsent",
    value: "I consent to receive treatment for my health conditions",
  },
  {
    name: "disclosureConsent",

    value:
      "I consent to the use and disclosure of my health information for treatment purposes",
  },
  {
    name: "privacyConsent",
    value: "I acknowledge that I have reviewed and agree to the privacy policy",
  },
];

export const patientDefaultValues: patientType<string, Date, boolean, Gender> =
  {
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: "Male" as Gender,
    address: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    primaryPhysician: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "Birth Certificate",
    identificationNumber: "",
    identificationDocument: [],
    privacyConsent: false,
    treatmentConsent: false,
    disclosureConsent: false,
  };

export const AppointmentDefaultValues: AppointmentFormTypes<string, Date> = {
  primaryPhysician: "",
  reason: "",
  notes: "",
  schedule: new Date(Date.now()),
};

export const StatusIcon = {
  scheduled: "assets/icons/check.svg",
  pending: "assets/icons/pending.svg",
  cancelled: "assets/icons/cancelled.svg",
};
