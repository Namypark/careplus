import React from "react";
import Image from "next/image";
import { Doctors } from "./constants";
const DoctorBadge = ({ doctor }: { doctor: string }) => {
  const img = Doctors.find(({ name }) => doctor === name)?.image;
  return (
    <div className="flex gap-3 items-center">
      <Image
        src={img!}
        width={32}
        height={32}
        className="h-fit w-[32px] "
        alt={doctor}
      />
      <p className="whitespace-nowrap">Dr.{doctor}</p>
    </div>
  );
};

export default DoctorBadge;
