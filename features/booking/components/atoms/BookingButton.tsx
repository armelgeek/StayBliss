"use client";
import { useFormStatus } from "react-dom";

function BookingButton({ onClick  }: { onClick?: () => void }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} onClick={onClick}>
      {pending ? "Processing..." : "Book Now"}
    </button>
  );
}
export default BookingButton;
