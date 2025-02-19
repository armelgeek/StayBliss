import { auth } from "@/auth";
import Banner from "@/features/home/components/atoms/Banner";
import CheckoutForm from "@/features/reservations/components/molecules/history/checkout-section";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Reservation Checkout",
  description: "Checkout your reservation and let yourself have a good stay with us",
};

async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return redirect("/signin");

  return (
    <>
      <Banner title={"BOOKING CONFIRMATION"} />
      <CheckoutForm />
    </>
  );
}

export default Page;
