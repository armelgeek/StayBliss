import Contact from "@/features/contact/components/molecules/Contact";
import Banner from "@/features/home/components/atoms/Banner";

export const metadata = {
  title: "Contact Us",
  description: "Reach out to the Hotel Booking App ",
};

async function Page() {
  return (
    <>
      <Banner title={"REACHING OUT"} />
      <Contact />
    </>
  );
}

export default Page;
