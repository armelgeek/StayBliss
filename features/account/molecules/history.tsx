import { auth } from "@/auth";
import ReservationCard from "../atoms/ReservationCard";
import { headers } from "next/headers";
import { getGuestReservations } from "@/core/application/use-cases/reservation/reservation.use-case";
import { redirect } from "next/navigation";
import Link from "next/link";

async function History() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");
  const reservations = (await getGuestReservations(session.user?.id)) ?? [];

  return (
    <div className="grid grid-cols-2 gap-6">
      <h3 className="col-span-2">Your History</h3>
        {reservations.length ? (
          reservations.reverse().map((item) => <ReservationCard key={item.id} reservation={item} />)
        ) : (
          <div>
            <p>You have no booked room.</p>
            <Link className="underline" href={"/rooms"}>View Rooms</Link>
          </div>
        )}
      </div>
  );
}

export default History;