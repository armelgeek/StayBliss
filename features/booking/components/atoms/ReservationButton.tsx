"use client";
import { useFormStatus } from "react-dom";

function ReservationButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Booking..." : "Book Now"}
    </button>
  );
}

export default ReservationButton;
