/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Appointment } from "@/types/appwrite";
import { useState } from "react";
import AppointmentForm from "./forms/AppointmentForm";

export default function AppointmentModal({
  type,
  patientId,
  userId,

  appointment,
}: {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  //   title: string;
  //   description: string;
  appointment: Appointment;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500 "}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize header">
            {type} Appointment?
          </DialogTitle>
          <DialogDescription className="text-16-regular text-gray-600 my-3">
            Please fill in the following to {type} an appointment
            <AppointmentForm
              type={type}
              userId={userId}
              patientId={patientId}
              appointment={appointment}
              setOpen={setOpen}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
