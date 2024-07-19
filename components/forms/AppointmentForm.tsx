"use client";
import React, { useState } from "react";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import Image from "next/image";
import CustomForm from "../CustomForm";
import SubmitButton from "../SubmitButton";
import {
  CreateAppointmentSchema,
  getAppointmentSchema,
} from "@/lib/validation";
import { useRouter } from "next/navigation";
import { AppointmentDefaultValues, Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import { FormFieldType } from "./PatientForm";
import { CreateAppointmentParams, Status } from "@/types";
import { createAppointment } from "@/lib/actions/appointment.actions";
import { create } from "domain";

const AppointmentForm = ({
  userId,
  type,
  patientId,
}: {
  userId: string;
  type: "create" | "schedule" | "cancel";
  patientId: string;
}) => {
  const AppointmentFormValidation = getAppointmentSchema(type);

  const formSchema = AppointmentFormValidation;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Submit and continue";
      break;

    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;

    default:
      break;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...AppointmentDefaultValues,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    let status;

    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }
    try {
      if (type === "create" && patientId) {
        const appointmentData: CreateAppointmentParams = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          notes: values.notes,
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1 "
      >
        <section className="space-y-4 ">
          <h1 className="header">New Appointment</h1>
          <p className="text-16-regular text-dark-500">
            Request a new appointment in 10 seconds {type}
          </p>
        </section>
        {type !== "cancel" && (
          <>
            <CustomForm
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
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
                    {`${doctor.name}`}
                  </div>
                </SelectItem>
              ))}
            </CustomForm>
            <div className="flex flex-col xl:flex-row gap-6">
              <CustomForm
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                placeholder="Reason for appointment"
                label="Reason for appointment"
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
              dateFormat="MM/dd/yyyy - h:mm aa"
              showTimeSelect
            />
          </>
        )}
        {type === "cancel" && (
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="cancellationReason"
            placeholder="ex; Reason for cancellation"
            label="Reason for cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full `}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
