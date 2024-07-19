import React from "react";
import Image from "next/image";
import { formatDate } from "react-datepicker/dist/date_utils";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { SearchParamProps } from "@/types";
import { getAppointmentDetails } from "@/lib/actions/appointment.actions";
import { useSearchParams } from "next/navigation";
import { Doctor, Doctors } from "@/constants";
import { string } from "zod";
import { Button } from "@/components/ui/button";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointmentDetails(appointmentId);
  const doctor = Doctors.find(
    ({ name }) => name === appointment?.primaryPhysician
  );
  const date = formatDateTime(appointment?.schedule).dateTime;

  console.log(doctor);
  return (
    <div className="flex flex-col items-center h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo-full"
            width={1000}
            height={1000}
            className="h-10 w-fit"
          />
        </Link>
      </div>
      <section className="flex flex-col items-center flex-1">
        <Image
          src="/assets/gifs/success.gif"
          width={300}
          height={280}
          alt="success"
        />
        <h2 className="header mb-6 max-w-[600px] text-center">
          Your <span className="text-green-500">appointment request</span> has{" "}
          <br />
          been successfully submitted!
        </h2>
        <p className="text-18-medium text-gray-400 mb-12">
          We'll be in touch shortly to confirm
        </p>
      </section>
      <section className="request-details flex-1">
        <p className="text-24-bold text-gray-500 w-[391px]">
          Requested appointment details:{" "}
        </p>
        <div className="flex items-center justify-center gap-3">
          <Image
            src={doctor?.image!}
            alt="logo-full"
            width={1000}
            height={1000}
            className="h-[24px] w-[24px] mr-2"
          />
          <p className="text-12-regular whitespace-nowrap">{`Dr. Adam Smith`}</p>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/assets/icons/calendar.svg"
            alt="logo-full"
            width={1000}
            height={1000}
            className="h-[24px] w-[24px] mr-2"
          />
          <p> {date}</p>
        </div>
      </section>
      <Button variant="outline" className="shad-primary-btn my-4" asChild>
        <Link href={`/patients/${userId}/new-appointment`}>
          New Appointment
        </Link>
      </Button>
      <p className="copyright">© copyright 2024</p>
    </div>
  );
};

export default Success;
