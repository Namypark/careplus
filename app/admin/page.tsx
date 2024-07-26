import React from "react";
import Link from "next/link";
import Image from "next/image";
import CustomCards from "@/components/CustomCards";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/table/DataTable";
import columns, { PatientDetails } from "@/components/table/columns";

declare interface appointmentsType {
  documents: Document[];
  scheduled: number;
  pending: number;
  cancelled: number;
  totalCount: number;
}

const Admin = async () => {
  const appointments = await getRecentAppointmentList();

  // console.log(appointments?.documents);

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between space-y-14">
      <header className="admin-header w-full">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={161}
            height={40}
          />
        </Link>

        <div className="flex flex-row gap-4 items-center justify-center">
          <Image
            src="/assets/images/admin.png"
            width={32}
            height={32}
            alt="profile-photo"
          />
          <p className="text-16-semibold">Admin</p>
        </div>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome, Admin</h1>
          <p className="text-16-semibold text-dark-700 ">
            Start your day by managing new appointments
          </p>
        </section>
        <section className="admin-stat">
          <CustomCards
            type="appointments"
            count={appointments?.scheduled}
            label="Scheduled appointments"
            icon="/assets/icons/yellow-calender.svg"
          />
          <CustomCards
            type="pending"
            count={appointments?.pending}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <CustomCards
            type="cancelled"
            count={appointments?.cancelled}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        {/* <DataTable data={appointments?.documents} columns={columns} /> */}
        <DataTable columns={columns} data={appointments?.documents} />
      </main>
    </div>
  );
};
export default Admin;
