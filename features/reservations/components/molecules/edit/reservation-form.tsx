"use client";

import { FormEvent } from "react";
import ConfirmationButton from "../../atoms/history/confirmation-button";

function ReservationForm({ capacity, setGuests, guests, handleSubmit, children }:{
    capacity: number
    setGuests: (guests: number) => void
    guests: number
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
    children: React.ReactNode
}) {
  return (
    <form action={handleSubmit} >
      <div>
        <div>
          <label htmlFor="" >
            Guests Number:
          </label>
          <select
            defaultValue={guests}
            name=""
            id=""
            onChange={(e) => (e.target.value ? setGuests(e.target.value as unknown as number) : null)}
          >
            <option value="">Select guests number</option>
            {Array.from(Array(capacity ?? 0)).map((item, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        {children}
      </div>
      <div>
        <ConfirmationButton />
      </div>
    </form>
  );
}

export default ReservationForm;
