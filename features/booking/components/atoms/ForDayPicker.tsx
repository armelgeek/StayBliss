import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getReservationByID, getRoomReservations } from "@/core/application/use-cases/reservation/reservation.use-case";
import { CircleIcon } from "lucide-react";

function FormDayPicker({ handleDateSelection, start, end }:{
    handleDateSelection: (range: { from: Date, to: Date } | null) => void;
    start: string;
    end: string;
}) {
  const [disabledDays, setDisabledDays] = useState<Array<{ before: string; after: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { room_slug, id } = useParams();
  const calendarRangeRef = useRef({ start: new Date(2024, 0), end: new Date(2027, 11) });

  useEffect(() => {
    if (!room_slug) return;
    async function getBusyDays() {
      setIsLoading(true);
      let reservations = [];
      let busy_days = [];

      if (id) {
        console.log('ca entre quand meme')
        /**const reservation_target = await getReservationByID(id as string);

        if (!reservation_target) {
          setIsLoading(false);
          return;
        }

        reservations = await getRoomReservations(reservation_target.rooms?.capacity);
        busy_days = reservations.filter((item) =>
          id != item.id ? { before: item.end_date, after: item.start_date } : false
        );**/
      } else {
        console.log('room_slug', room_slug)
        if (Array.isArray(room_slug)) {
          setIsLoading(false);
          return;
        }
        reservations = await getRoomReservations(room_slug);
        // busy_days = reservations.map((item) => ({ before: item.end_date, after: item.start_date }));
      }

      // console.log("BLOCKED");
      // console.log(reservations.map((item) => ({ before: item.end_date, after: item.start_date })));
      setDisabledDays(busy_days);
      setIsLoading(false);
    }

    getBusyDays();
  }, [room_slug, id]);

  if (isLoading)
    return (
      <div className={"section-loader"}>
       
      </div>
    );

  return (
    <div>
      <div>
        <DayPicker
          captionLayout="dropdown"
          min={0}
          onSelect={(range) => handleDateSelection(range)}
          mode="range"
          selected={start && end ? { from: start, to: end } : null}
          startMonth={calendarRangeRef.current.start}
          endMonth={calendarRangeRef.current.end}
          weekStartsOn={1}
          numberOfMonths={2}
          disabled={[{ before: new Date() }, ...disabledDays]}
          footer={
            <p>
              <span>
                <CircleIcon />
              </span>
              <span>Please Pick a Range</span>
            </p>
          }
          classNames={{
            today: "bg-primary-500 text-white rounded-full",
            selected: "bg-primary-500 text-white rounded-full",
            range_start: "bg-primary-500 text-white rounded-full",
            range_end: "bg-primary-500 text-white rounded-full",
            range_middle: "bg-primary-500 text-white rounded-full",
            chevron: "text-primary-500",
            footer: "text-sm text-gray-500",
          }}
        />
      </div>
    </div>
  );
}

export default FormDayPicker;
