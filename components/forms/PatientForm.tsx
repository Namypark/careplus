"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CustomForm from "../CustomForm";
import SubmitButton from "../SubmitButton";
import { UserValidationForm } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATEPICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const formSchema = UserValidationForm;

const PatientForm = () => {
  // 1. Define your form.
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const userData = {
        name,
        email,
        phone,
      };
      const user = await createUser(userData);
      if (user) router.push(`patients/${user.$id}/register`);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 "
      >
        <section className="mb-12 space-y-4 ">
          <h1 className="header">Hi there, 👋🏽</h1>
          <p className="text-16-regular text-dark-500">
            Schedule your appointment
          </p>
        </section>

        <CustomForm
          control={form.control}
          fieldType={FormFieldType.INPUT}
          label="Full Name"
          iconSrc="/assets/icons/user.svg"
          name="name"
          placeholder="john doe"
          iconAlt="user"
        />
        <CustomForm
          control={form.control}
          fieldType={FormFieldType.INPUT}
          label="Email"
          iconSrc="/assets/icons/email.svg"
          name="email"
          placeholder="johndoe@email.com"
          iconAlt="email"
        />
        <CustomForm
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          label="phone number"
          name="phone"
          placeholder="+23480000000112"
          iconAlt="phone"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
