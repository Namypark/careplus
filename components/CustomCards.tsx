import clsx from "clsx";
import React from "react";
import Image from "next/image";

declare interface cards {
  type: "appointments" | "pending" | "cancelled";
  count: number | undefined;
  label: string;
  icon: string;
}

const CustomCards = async ({ type, count = 0, label, icon }: cards) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4 ">
        <Image
          src={icon}
          alt="label"
          className="size-8 w-fit"
          width={32}
          height={32}
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular w-[352px]">Total number of {label}</p>
    </div>
  );
};

export default CustomCards;
