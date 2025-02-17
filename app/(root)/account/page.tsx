import History from "@/features/account/molecules/history";
import { Metadata } from "next";
export const metadata: Metadata = { title: "Activity" };


export default function Page() {
  return (
    <div className="flex flex-col gap-2">
        <History/>
    </div>
  );
}
