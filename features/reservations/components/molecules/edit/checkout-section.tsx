import { auth } from "@/auth";
import axios from "axios";
import { getRoomById } from "@/core/application/use-cases/room/get-room-by-id.use-case";
import { reservationSchema } from "@/core/domain/schema/reservation.schema";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import CheckoutForm from "../history/checkout-form";
import CheckoutOverview from "../history/checkout-overview";
import { bookingCancelAction } from "@/app/(root)/account/_actions";

async function CheckoutSection() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const reservation_cookies = await cookies();
  if (!reservation_cookies.has("pending_reservation")) {
    redirect("/rooms");
  }

  const reservationCookie = reservation_cookies.get("pending_reservation");
  if (!reservationCookie) {
    redirect("/rooms");
  }

  const pending_reservation = JSON.parse(reservationCookie.value);

  const [room, guest] = await Promise.all([
    getRoomById(pending_reservation.room_id), 
    session.user
  ]);
  if (!room) notFound();

  async function createReservationAction(prevState: {
    isConfirming: boolean;
  }, formData: FormData) {
    "use server";
    console.log("state");
    console.log(prevState);
    prevState = { ...prevState, isConfirming: true };
    const fullname = formData.get("fullname");
    const nationalID = formData.get("nationalID");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const nationalityWithFlag = formData.get("nationality");
    const message = formData.get("message");

    try {
      reservationSchema.parse({ fullname, email, phone, nationality: nationalityWithFlag, nationalID, message });
    } catch (err) {
      // console.log("errors");
      // console.log(err.errors);
      //const errors: Record<string, string> = {};
      /**err?.errors.forEach((element) => {
        errors[element?.path[0] ?? "unknown"] = element.message;
      });
      prevState = { ...errors };
    **/
      return { ...prevState };
    }

   // const [nationality, countryFlag] = nationalityWithFlag.split("%");

   // const total_price = (room.price + ((room.price / 2) * pending_reservation.guests_count - 1)).toFixed(2);

    //let flagError = { error: false, payload: "" };
    try {
     // const session = await auth();

     /** await updateGuest(
        session?.supabaseAccessToken,
        guest.id,
        fullname,
        nationality,
        countryFlag,
        phone,
        email,
        nationalID
      );
 */
      pending_reservation.message = message;
      (await cookies()).set("pending_reservation", JSON.stringify(pending_reservation));

      //const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      /**const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe`,
        { pending_reservation },
        {
          headers: { Authorization: `Bearer ${session?.supabaseAccessToken}` },
        }
      );**/
      // console.log({ STRIPE: response.data, KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY });
      // redirect(response.checkout_url); // CANNOT BE USED WITH TRY BLOCK
      //flagError.payload = response.data?.checkout_url;
      //console.log({ flagError, response });
    } catch (err) {
      //flagError.error = true;
      console.log("CHECKOUT COOKIE ERROR");
      console.log(err);
      return { ...prevState, criticalErr: "Failed to confirm your booking!" };
    } finally {
      revalidatePath("/account");
      // TODO: PREVENT REDIRECTING WHEN AN UNHANDLED ERROR OCCURS
      /**if (!flagError.error && flagError.payload) {
        console.log({ URL: flagError.payload });
        redirect(flagError.payload);
      }**/
    }
  }

  return (
    <div className={'container'}>
      <CheckoutForm
        createReservationAction={createReservationAction}
        room={room}
        guest={guest}
        bookingCancelAction={bookingCancelAction}
      >
        {/**TODO: ADD NATIONALITY IN USER INFO */ }
        {/**<SelectCountry name={"nationality"}  defaultCountry={guest.nationality} />**/}
      </CheckoutForm>

      <CheckoutOverview room={room} pending_reservation={pending_reservation} />
    </div>
  );
}

export default CheckoutSection;
