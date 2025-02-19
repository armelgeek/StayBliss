import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { getReservationByID } from "@/core/application/use-cases/reservation/reservation.use-case";
import Banner from "@/features/home/components/atoms/Banner";
import EditSection from "@/features/reservations/components/atoms/edit/edit-section";

export const metadata = {
  title: "Edit Reservation",
  description: "Edit your already booked reservation ",
};

async function Page({ params }:{
  params: {
    id: string;
  };
}) {
  const reservation_id = params?.id;

  const reservation = await getReservationByID(reservation_id);
  if (!reservation) notFound();

  const isUpdateAllowed = reservation.status === "confirmed" || reservation.status === "unconfirmed";

  if (!isUpdateAllowed) return <h4>Sorry, but reservation cannot be edited.</h4>;

  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.id !== reservation.guest_id)
    return (
      <div className="container">
        <h2>Unauthorized action!</h2>
      </div>
    );
  return (
    <>
      <Banner title={"EDIT RESERVATION"} />
      <EditSection reservation={reservation} />
    </>
  );
}

export default Page;
