import { reservationCancelAction, reservationUpdateAction } from "@/app/(root)/account/_actions";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { deleteReservation, getReservationByID } from "@/core/application/use-cases/reservation/reservation.use-case";
import ControlButtons from "@/shared/components/atoms/control-buttons";
import { formatToAbrFormat } from "@/shared/utils/datetime";
import { isFuture, isPast } from "date-fns";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

type ReservationCardProps = {
  reservation: {
    id: string
    rooms: {
      name: string
      thumbnail: string
    }
    start_date: string
    end_date: string
    guests_count: number
    reserved_price: number
    status: string
  }
}

function ReservationCard({ reservation }: ReservationCardProps) {
  async function deleteReservationAction(prevState: { error?: string, status?: string }, formData: FormData) {
    "use server";

    prevState = { ...prevState };

    const session = await auth.api.getSession({ headers: await headers() });
    const active_user = session?.user;

    if (!active_user) return { ...prevState, error: "unauthorized action, please authenticate and try again" };

    const targeted_reservation = await getReservationByID(reservation.id);
    if (!targeted_reservation) return { ...prevState, error: "unauthorized action, please authenticate and try again" };

    if (targeted_reservation.status === "confirmed")
      return { ...prevState, error: "Cannot delete active reservations! You may want to cancel it instead" };

    if (targeted_reservation.guest_id !== active_user.id) return { ...prevState, error: "unauthorized action!" };

    await deleteReservation(reservation.id);
    revalidatePath("/account");

    return { ...prevState, status: "success" };
  }

  const arrivalDate = formatToAbrFormat(reservation.start_date);
  const departureDate = formatToAbrFormat(reservation.end_date);

  return (
    <article>
      {/**<div>
        <Image fill src={`${SUPABASE_ROOMS_URL}/${reservation.rooms.thumbnail}`} />
      </div>**/}

      <div>
        <div>
          <h2>
            <span>{reservation.rooms.name}</span>
            {isPast(reservation.start_date) && isFuture(reservation.end_date) ? (
              <span>ON GOING</span>
            ) : isFuture(reservation.start_date) ? (
              <span>FUTURE</span>
            ) : isPast(reservation.end_date) ? (
              <span>PAST</span>
            ) : (
              ""
            )}
          </h2>
          <p>
            {formatToAbrFormat(arrivalDate)} - {formatToAbrFormat(departureDate)}
          </p>

          <p>
            <span>${reservation.reserved_price.toFixed(2)}</span> - {reservation.guests_count}{" "}
            Guest(s)
          </p>

          <Badge
            variant={
              reservation.status == "unconfirmed"
                ? "outline"
                : reservation.status == "canceled" || reservation.status == "finished"
                ? "destructive"
                : "secondary"
            }
          >
            {reservation.status}
          </Badge>
        </div>
        <div>

          <ControlButtons
            reservationUpdateAction={reservationUpdateAction}
            deleteAction={deleteReservationAction}
            reservation={reservation}
            reservationCancelAction={reservationCancelAction}
          /> 

          {/* <DeleteForm deleteAction={deleteReservationAction} /> */}
        </div>
      </div>
    </article>
  );
}

export default ReservationCard;
