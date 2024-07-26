"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CustomForm from "../CustomForm";
import SubmitButton from "../SubmitButton";
import { PatientValidationForm, UserValidationForm } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser, registerPatient } from "@/lib/actions/patient.actions";
import { Gender, User } from "@/types";
import { FormFieldType } from "./PatientForm";
import {
  consent,
  Doctors,
  GenderOptions,
  IdentificationTypes,
  patientDefaultValues,
} from "@/components/constants";
import { SelectItem } from "@/components/ui/select";
import FileUploader from "../FileUploader";

const formSchema = PatientValidationForm;
/***
 * @formSchema is using the patientValidationForm as its formSchema
 * the @formSchema doesn't need to be used and patientValidationForm can be passed directly
 * but we use it just for consistency
 * the form we can use the spread operator to get the rest of the other fields
 *A @blobFile <BLOB> or Binary Large Object, is a data type that can store large amounts of binary data,
 * such as images, audio, video, or other multimedia files,
 * as well as raw binary data. In the context of web development and JavaScript,
 * a BLOB is an object that represents immutable raw data.
 */
const RegistrationForm = ({ user }: { user: User }) => {
  // 1. Define your form.
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...patientDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      //@ts-ignore
      const patient = await registerPatient(patientData);
      console.log(patient);
      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
      console.log(user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1 "
      >
        <section className="space-y-4 ">
          <h1 className="header">Welcome, 👋🏽</h1>
          <p className="text-16-regular text-dark-500">
            Let us know more about yourself
          </p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomForm
          control={form.control}
          fieldType={FormFieldType.INPUT}
          iconSrc="/assets/icons/user.svg"
          name="name"
          placeholder="john doe"
          iconAlt="user"
          label="Full name"
        />
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.INPUT}
            iconSrc="/assets/icons/email.svg"
            name="email"
            placeholder="johndoe@email.com"
            iconAlt="email"
            label="Email Address"
          />
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="phone"
            placeholder="+23480000000112"
            iconAlt="phone"
            label="Phone Number"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.DATEPICKER}
            iconSrc="/assets/icons/calendar.svg"
            name="birthDate"
            iconAlt="calender"
            label="Date of Birth"
            placeholder="select your birth date"
          />
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            placeholder=""
            iconAlt="gender"
            label="Gender"
            renderSkeleton={(field: ControllerRenderProps<any, string>) => (
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex h-11 gap-6 xl:justify-between space-y-1"
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label
                        htmlFor={option}
                        className="cursor-pointer capitalize"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            placeholder="xxxxxx street address"
            iconAlt="address"
            label="Address"
          />
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            placeholder="Software engineer"
            label="Occupation"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            placeholder="Enter emergency contact name"
            iconAlt="emergency contact"
            label="Emergency Contact Name"
          />
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactNumber"
            placeholder="+23480000000112"
            iconAlt="emergencyContactNumber"
            label="Emergency Contact Number"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

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
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            placeholder="ex: BlueCross"
            label="Insurance provider"
          />
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insurancePolicyNumber"
            placeholder="ex: ABC1234567"
            label="Insurance policy number"
          />
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            placeholder="ex: Peanuts, Penicillin, Pollen"
            label="Allergies(if any)"
          />
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
            label="Current Medication"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            placeholder="ex: Mother had breast cancer"
            label="Family medical history"
          />
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            placeholder="ex: Asthma diagnosis in childhood"
            label="Past medical history"
          />
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>
        <CustomForm
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="identificationType"
          label="Identification Type"
          placeholder="Select your Identity type"
        >
          {IdentificationTypes.map((id) => (
            <SelectItem value={id} key={id}>
              <div className="flex items-center gap-2">{id}</div>
            </SelectItem>
          ))}
        </CustomForm>
        <CustomForm
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="identificationNumber"
          placeholder="ex:1234567"
          label="Identification Number"
        />
        <CustomForm
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="identificationDocument"
          label="Scanned Copy of identification document"
          renderSkeleton={(field: ControllerRenderProps<any, string>) => (
            <FormControl>
              <FileUploader file={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>
        {consent.map(({ name, value }) => (
          <CustomForm
            key={name}
            control={form.control}
            fieldType={FormFieldType.CHECKBOX}
            name={name}
            label={value}
          />
        ))}

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegistrationForm;
