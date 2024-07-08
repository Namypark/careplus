import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

/***

 */
export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
<h2>Custom OTP</h2>
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image src="/assets/icons/logo-full.svg" alt="logo-full"
          width={1000}
          height={1000}
          className="mb-12 h-10 w-fit"
          />
          <PatientForm />

          <div className="flex text-14-regular mt-20 justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left"> © 2024 careplus</p> 
          <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
       
      </section>
      <Image src="/assets/images/onboarding-img.png" 
      alt="onboarding-image" 
      width={1000} 
      height={1000} 
      className="side-img w-[50%]"/>
    </div>
  )
  }