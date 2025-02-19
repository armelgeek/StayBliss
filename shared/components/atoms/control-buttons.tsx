"use client";

import {  Eye } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import DeleteForm from "./delete-form";
import ReservationOverview from "@/features/account/molecules/reservation-overview";
function ControlButtons({ deleteAction, reservation, reservationCancelAction }:{
    deleteAction: (formData: FormData) => Promise<void>,
    reservation: {
      id: string;
      status: string;
    },
    reservationCancelAction: () => void
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger><Eye/></DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogDescription>
               <ReservationOverview
                    reservation={reservation}
                    allowDelete={false}
                    reservationCancelAction={reservationCancelAction}
                    deleteAction={deleteAction}
                />
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
      {reservation.status !== "confirmed" && <DeleteForm deleteAction={deleteAction} />}
    </>
  );
}

export default ControlButtons;
