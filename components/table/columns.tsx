"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Appointment } from "@/types/appwrite";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import StatusBadge from "../StatusBadge";
import DoctorBadge from "../DoctorBadge";
import AppointmentModal from "../AppointmentModal";

export type PatientDetails = {
  patient: string;
  date: Date;
  status: "scheduled" | "pending" | "cancelled";
  doctor: string;
  action: string;
};

// export const payments: Payment[] = [
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "489e1d42",
//     amount: 125,
//     status: "processing",
//     email: "example@gmail.com",
//   },
//   // ...
// ];

/****
 * Note: Columns are where you define the core of what your table will look like.
 * They define the data that will be displayed, how it will be formatted,
 * sorted and filtered.
 */
const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "ID",
    cell: ({ row }) => {
      return <div className="text-14-medium">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <div className="text-14-medium">{appointment.patient.name}</div>;
    },
  },
  {
    accessorKey: "schedule",
    header: "schedule",
    cell: ({ row }) => {
      const formattedDate = formatDateTime(row.original.schedule).dateTime;
      return <div className="text-14-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
  },

  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = row.original.primaryPhysician;
      return (
        <div className="text-14-medium">
          <DoctorBadge doctor={doctor} />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
        </div>
      );
    },
  },
  {
    id: "ID",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // ...
];

export default columns;
