"use client";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";

import { addDays, formatISO, isBefore } from "date-fns";
import { toast } from "sonner";
import BookingButton from "../atoms/BookingButton";

function BookingForm({ bookingSearchAction, children }: {
  bookingSearchAction: (date: string) => Promise<void>;
  children?: React.ReactNode;
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(addDays(new Date(), 1)));

  function handleStartSelection(date: Date) {
    setStartDate(date);
  }

  function handleEndSelection(date: Date) {
    setEndDate(date);
  }

  async function handleSearch() {
    if (!startDate || !endDate) return;
    const arrival = formatISO(new Date(startDate), { representation: "date" });
    const departure = formatISO(new Date(endDate), { representation: "date" });
    const formatedRange = `${arrival}_${departure}`;

    if (!isBefore(arrival, departure)) {
      toast.error("Invalid date range!");
      return;
    }
    // await new Promise((res) => setTimeout(res, 5000));
    await bookingSearchAction(formatedRange);
    // router.push(`rooms?range=${formatedRange}`);
  }

  return (
    <form action={handleSearch}>
      <h1>BOOK A ROOM ONLINE</h1>
      <div>
        <label htmlFor="">Arrival</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleStartSelection(date as Date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat={"dd/MM/yyyy"}
          excludeDateIntervals={[{ start: new Date("01/01/1970"), end: new Date() }]}
        />
      </div>
      <div>
        <label htmlFor="">Departure</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => handleEndSelection(date  as Date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat={"dd/MM/yyyy"}
          excludeDateIntervals={[{ start: new Date("01/01/1970"), end: new Date() }]}
        />
      </div>

      <div>
        <BookingButton />
        <div>{children}</div>
      </div>
    </form>
  );
}

export default BookingForm;
