import Image from "next/image";
import Logo from "@/public/assets/icons/logo-full.svg";
import React from "react";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";
import RegistrationForm from "@/components/forms/RegistrationForm";
import { SearchParamProps } from "@/types";
import { getUser } from "@/lib/actions/patient.actions";
import * as Sentry from "@sentry/nextjs";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  // Add 'jane' to a set
  // used for tracking the number of users that viewed a page.
  Sentry.metrics.set("user_view_register", user.name);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src={Logo}
            alt="logo-full"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <RegistrationForm user={user} />

          <p className="copyright py-12">© 2024 careplus</p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="register-image"
        width={1000}
        height={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
