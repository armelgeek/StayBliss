import Image from "next/image";
import { nightTotalPrice } from "@/shared/utils/reservationsCalcs";
import { daysDifferCount, formatToAbrFormat } from "@/shared/utils/datetime";
import { bookingTotalPrice } from "@/shared/utils/reservationsCalcs";
import styles from "./checkout-overview.module.css";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
type Props = {
  room: {
    name: string;
    thumbnail: string;
    price: number;
  };
  pending_reservation: {
    start_date: string;
    end_date: string;
    guests_count: number;
  };
};
function CheckoutOverview({ room, pending_reservation }: Props) {
  const totalNights = daysDifferCount(pending_reservation.end_date, pending_reservation.start_date);
  const totalPerNight = nightTotalPrice(room.price, pending_reservation.guests_count);
  const guestsPrice = ((pending_reservation.guests_count - 1) * (room.price / 2)).toFixed(2);
  const totalPrice = bookingTotalPrice(room.price, pending_reservation.guests_count, totalNights);
  return (
    <div>
      <Card>
        <CardTitle>
          <Image fill src={`${room.thumbnail}`} alt={`${room.name} thumbnail`} />
        </CardTitle>
        <CardDescription className={styles.overviewDescription}>
          <h2>{room.name}</h2>
          <div className={styles.bookingSummary}>
            <h3>Booking Summary</h3>
            <p>
              <span>Arrival</span>
              <span>{formatToAbrFormat(pending_reservation.start_date)}</span>
            </p>
            <p>
              <span>Departure</span>
              <span>{formatToAbrFormat(pending_reservation.end_date)}</span>
            </p>
            <p>
              <span>Guests</span>
              <span>{String(pending_reservation.guests_count).padStart(2, "0")}</span>
            </p>
          </div>

          <div className={styles.bookingSummary}>
            <h3>Pricing Breakdown</h3>
            <p>
              <span>${room.price} x night (Base Rate for 1 Guest)</span>
              <span>${room.price.toFixed(2)}</span>
            </p>
            <p>
              <span>
                Additional Guests ({pending_reservation.guests_count - 1} x ${room.price / 2}per night)
              </span>
              <span>${guestsPrice}</span>
            </p>
            <p>
              <span>Total per Night: </span>
              <span>${totalPerNight}</span>
            </p>
          </div>

          <div className={styles.totalPrice}>
            <span>Total Without Taxes ({totalNights} Nights)</span>
            <span>${totalPrice}</span>
          </div>
        </CardDescription>
      </Card>
    </div>
  );
}

export default CheckoutOverview;
