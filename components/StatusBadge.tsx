import { Status } from "@/types";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { StatusIcon } from "./constants";

const StatusBadge = ({ status }: { status: Status }) => {
  const color = {
    scheduled: "green",
    pending: "blue",
    cancelled: "red",
  };
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "scheduled",
        "bg-red-600": status === "cancelled",
        "bg-blue-600": status === "pending",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-red-500": status === "cancelled",
          "text-blue-500": status === "pending",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
