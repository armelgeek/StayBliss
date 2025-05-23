"use client";
import { useCallback, useState } from "react";
import { formatISO } from "date-fns";
import { useFormState } from "react-dom";

const initialState = {};

function EditContainer({ reservation, reservationUpdateAction }:{
    reservation: {
        id: string
        guests_count: number
        reserved_price: number
        start_date: string
        end_date: string
        created_at: string
        rooms: {
            thumbnail: string
            name: string
        }
    }
    reservationUpdateAction: (prevState: { error?: string, status?: string }, formData: FormData) => Promise<{ error?: string, status?: string }>
}) {
  const [state, formAction] = useFormState(reservationUpdateAction, initialState);

  const [startDate, setStartDate] = useState(new Date(reservation.start_date));
  const [endDate, setEndDate] = useState(new Date(reservation.end_date));
  const [guests, setGuests] = useState(reservation.guests_count);

  const handleDateSelection = useCallback((range: { from: Date, to: Date } | null) => {
    console.log(range);
    if (!range) return;

    const from = formatISO(range?.from, { representation: "date" });
    const to = formatISO(range?.to, { representation: "date" });

    console.log(from, to);
    setStartDate(from);
    setEndDate(to);
  }, []);

  async function handleSubmit() {
    const reservationFormData = new FormData();
    reservationFormData.set("start_date", startDate);
    reservationFormData.set("end_date", endDate);
    reservationFormData.set("guests", guests);
    reservationFormData.set("reservation_id", reservation.id);

    await formAction(reservationFormData);
  }

  if (state.status === "success") toast.success("Your reservation has been updated!");
  else if (state.error) toast.error(state.error);

  return (
    <>
      <ReservationForm
        handleDateSelection={handleDateSelection}
        capacity={reservation.rooms.capacity}
        setGuests={setGuests}
        guests={guests}
        handleSubmit={handleSubmit}
      >
        <FormDayPicker handleDateSelection={handleDateSelection} start={startDate} end={endDate} />
      </ReservationForm>
      <CheckoutOverview reservation={reservation} start={startDate} end={endDate} guests={guests} />
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}

export default EditContainer;
