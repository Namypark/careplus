"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import Image from "next/image";
import CustomForm from "../CustomForm";
import SubmitButton from "../SubmitButton";
import { CreateAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { AppointmentDefaultValues, Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import { FormFieldType } from "./PatientForm";

const AppointmentForm = ({
  userId,
  type,
  patientId,
}: {
  userId: string;
  type: "create" | "update" | "cancel";
  patientId: string;
}) => {
  const formSchema = CreateAppointmentSchema;
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...AppointmentDefaultValues,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // let formData;
    // if (
    //   values.identificationDocument &&
    //   values.identificationDocument.length > 0
    // ) {
    //   const blobFile = new Blob([values.identificationDocument[0]], {
    //     type: values.identificationDocument[0].type,
    //   });
    //   formData = new FormData();
    //   formData.append("blobFile", blobFile);
    //   formData.append("fileName", values.identificationDocument[0].name);
    // }
    // try {
    //   const patientData = {
    //     ...values,
    //     userId: user.$id,
    //     birthDate: new Date(values.birthDate),
    //     identificationDocument: formData,
    //   };
    //   //@ts-ignore
    //   const patient = await registerPatient(patientData);
    //   console.log(patient);
    //   if (patient) router.push(`patients/${user.$id}/new-appointment`);
    //   console.log(user);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1 "
      >
        <section className="space-y-4 ">
          <h1 className="header">Hey there, 👋🏽</h1>
          <p className="text-16-regular text-dark-500">
            Request a new appointment in 10 seconds
          </p>
        </section>
        {type !== "cancel" && (
          <>
            <CustomForm
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Primary physician"
              placeholder="Select your primary care physician"
            >
              {Doctors.map((doctor) => (
                <SelectItem value={doctor.name} key={doctor.name}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={24}
                      height={24}
                      className="mr-2 rounded-full border border-dark-500"
                      alt={doctor.name}
                    />
                    {`Dr. ${doctor.name}`}
                  </div>
                </SelectItem>
              ))}
            </CustomForm>
            <div className="flex flex-col xl:flex-row gap-6">
              <CustomForm
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                placeholder="Reason for appointments"
                label="Reason for appointments"
              />
              <CustomForm
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="notes"
                placeholder="ex; prefer afternoon appointments if available"
                label="Additional comments/notes"
              />
            </div>
            <CustomForm
              control={form.control}
              fieldType={FormFieldType.DATEPICKER}
              iconSrc="/assets/icons/calendar.svg"
              name="schedule"
              iconAlt="calender"
              label="Expected appointment date"
              placeholder="select your appointment date"
            />
          </>
        )}

        <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
