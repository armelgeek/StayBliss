"use client";
import { formatISO } from "date-fns";

import { useFormState } from "react-dom";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import FormDayPicker from "../atoms/ForDayPicker";
import { Bed, Calendar, Users } from "lucide-react";
import ReservationButton from "../atoms/ReservationButton";

const initialState = {
  dateError: "",
  guestsError: "",
  criticalError: "",
  isBooking: false,
};

function RoomBookingForm({ bookingAction, room }:{
  bookingAction: (prevState: typeof initialState, formData: FormData) => Promise<typeof initialState>,
  room: {
    id: string
    name: string
    capacity: number
    thumbnail: string
  }
}) {
  const [_, formAction] = useFormState(bookingAction, initialState);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [guests, setGuests] = useState("");

  const handleDateSelection = useCallback((range: { from: Date, to: Date } | null) => {
    if (!range) return;
    const from = formatISO(range?.from, { representation: "date" });
    const to = formatISO(range?.to, { representation: "date" });

    console.log({ from, to });

    setStartDate(from);
    setEndDate(to);
  }, []);

  function handleSubmit() {
    if (!(startDate && endDate)) {
      toast.error("Please select a date range from the calendar");
      return;
    }

    if (!guests || parseInt(guests) < 1 || parseInt(guests) > room.capacity) {
      toast.error("Please provide guests number");
      return;
    }

    const newForm = new FormData();
    newForm.set("start_date", startDate);
    newForm.set("end_date", endDate);
    newForm.set("guests_count", guests);
    newForm.set("room_id", room.id);
    formAction(newForm);
  }

  return (
    <form action={handleSubmit}>
      <FormDayPicker start={startDate} end={endDate} handleDateSelection={handleDateSelection} />

      <div>
        <div>
          <div>
            <Bed />
          </div>
          <div>
            <label>Room Type</label>
            <input type="text" value={room.name} readOnly disabled />
          </div>
        </div>
        <div>
          <div>
            <Calendar />
          </div>
          <div>
            <label>Check In</label>
            <input type="date" value={startDate} disabled />
          </div>
        </div>
        <div>
          <div>
            <Calendar />
          </div>
          <div>
            <label>Check Out</label>
            <input type="date" value={endDate} disabled />
          </div>
        </div>
        <div>
          <div >
            <Users/>
          </div>
          <div>
            <label>Guests</label>
            <select name="" id="" onChange={(e) => setGuests(e.target.value)}>
              <option value="">Select guests number</option>
              {Array.from(Array(room?.capacity ?? 0)).map((item, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <button type="submit" className={styles.formButton} disabled={state.isBooking}>
          {state.isBooking ? "Booking..." : "Book Now"}
        </button> */}
        <ReservationButton />
      </div>
    </form>
  );
}

export default RoomBookingForm;
