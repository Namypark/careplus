import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { SearchParamProps } from "@/types";
import PassKeyModal from "@/components/PassKeyModal";

/***

 */
export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo-full"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />

          <div className="flex text-14-regular mt-20 justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              {" "}
              © 2024 careplus
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        alt="onboarding-image"
        width={1000}
        height={1000}
        className="side-img w-[50%]"
      />
    </div>
  );
}
