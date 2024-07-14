import React from "react";
import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/types";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  //   const databases = await

  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <h2>Custom OTP</h2>
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo-full"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm
            userId={userId}
            type="create"
            patientId={patient.$id}
          />
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="onboarding-image"
        width={1000}
        height={1000}
        className="side-img w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
