"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription
} from "@/components/ui/card"
import DeleteForm from "@/shared/components/atoms/delete-form";
import { formatToAbrFormat } from "@/shared/utils/datetime";
import { Ban, Edit } from "lucide-react";
import Link from "next/link";

import { useState } from "react";

interface Reservation {
  id: string;
  guests_count: number;
  reserved_price: number;
  start_date: string;
  end_date: string;
  created_at: string;
  rooms: {
    thumbnail: string;
    name: string;
  };
}

interface ReservationOverviewProps {
  deleteAction: (formData: FormData) => Promise<void>;
  reservation: Reservation;
  allowDelete?: boolean;
  reservationCancelAction: (formData: FormData) => Promise<void>;
  children?: React.ReactNode;
}

const ReservationOverview: React.FC<ReservationOverviewProps> = ({
  deleteAction,
  reservation,
  allowDelete = true,
  reservationCancelAction,
  children,
}) => {
  const [showCancel, setShowCancel] = useState(false);

  async function handleCancel() {
    const cancelForm = new FormData();
    cancelForm.set("reservation_id", reservation.id);

    await reservationCancelAction(cancelForm);
  }

  return (
    <Card
     className="py-6 px-4">
  
      <CardDescription className="mt-4">
        <h3  className="text-xl font-bold">
          Deluxe Room
        </h3>
        <div className="mt-4">
          <h3  className="text-lg font-bold">
            Booking Summary
          </h3>
          <div className="mt-2">
            <h3 >
              <span className="font-bold">Arrival:</span>
              <span className="ml-1">
                {formatToAbrFormat(new Date(reservation.start_date) as unknown as string)}
              </span>
            </h3>
            <h3>
              <span className="font-bold">Departure:</span>
              <span className="ml-1">
                {formatToAbrFormat(new Date(reservation.end_date) as unknown as string)}
              </span>
            </h3>
            <h3>
              <span className="font-bold">Guests:</span>
              <span className="ml-1">
                {String(reservation.guests_count).padStart(2, "0")}
              </span>
            </h3>
            <h3>
              <span className="font-bold">Reservation Date:</span>
              <span className="ml-1">
                {formatToAbrFormat(new Date(reservation.created_at) as unknown as string)}
              </span>
            </h3>
            <h3>
              <span className="font-bold">Total Price:</span>
              <span className="ml-1">
                ${Number(reservation.reserved_price).toFixed(2)}
              </span>
            </h3>
          </div>
        </div>

        <div className="mt-6">
          <Link href={`/reservations/edit/${reservation.id}`}>
            <Button variant="outline" className="mr-2">
              <Edit /> Edit
            </Button>
          </Link>

          {allowDelete ? (
            <DeleteForm deleteAction={deleteAction as never} showLabel={true} />
          ) : (
            <>
              <Button
                variant="destructive"
                onClick={() => setShowCancel(true)}
                className="mr-2"
              >
                <Ban /> Cancel
              </Button>
              <Dialog open={showCancel} onOpenChange={setShowCancel}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="mr-2">
                    <Ban /> Cancel
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure you want to cancel this reservation?</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <Button onClick={handleCancel}>Yes, Cancel</Button>
                    <Button onClick={() => setShowCancel(false)}>Go Back</Button>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>

        {children}
      </CardDescription>
    </Card>
  );
};

export default ReservationOverview;