import { reservationUpdateAction } from "@/app/(root)/account/_actions";
import EditContainer from "./edit-container";

async function EditSection({ reservation }:{
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
  return (
    <div>
      <EditContainer reservation={reservation} reservationUpdateAction={reservationUpdateAction} />
    </div>
  );
}

export default EditSection;
