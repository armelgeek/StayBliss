import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { daysDifferCount, formatToAbrFormat } from "@/shared/utils/datetime";
import { bookingTotalPrice, nightTotalPrice } from "@/shared/utils/reservationsCalcs";
import Image from "next/image";

type Props = {
    reservation: {
        rooms: {
            name: string;
            thumbnail: string;
            price: number;
        }
        check_in: string;
        check_out: string;
    };
    guests: number;
    start: string;
    end: string;
};
function CheckoutOverview({ reservation, guests, start, end }:Props) {
  const totalNights = daysDifferCount(end, start);
  const totalPerNight = nightTotalPrice(reservation.rooms.price, guests);
  const guestsPrice = ((guests - 1) * (reservation.rooms.price / 2)).toFixed(2);
  const totalPrice = bookingTotalPrice(reservation.rooms.price, guests, totalNights);
  // return <h1>OVERVIEW CARD</h1>;
  return (
    <div>
      <Card>
        <CardTitle>
          <Image
            fill
            src={`${reservation.rooms.thumbnail}`}
            alt={`${reservation.rooms.name} thumbnail`}
          />
        </CardTitle>

        <CardDescription>
          <h2>{reservation.rooms.name}</h2>
          <div>
            <h3>Booking Summary</h3>
            <p>
              <span>Arrival</span>
              <span>{formatToAbrFormat(new Date(start) as unknown as string)}</span>
            </p>
            <p>
              <span>Departure</span>
              <span>{formatToAbrFormat(new Date(end) as unknown as string)}</span>
            </p>
            <p>
              <span>Guests</span>
              <span>{String(guests).padStart(2, "0")}</span>
            </p>
          </div>

          <div>
            <h3>Pricing Breakdown</h3>
            <p>
              <span>${reservation.rooms.price.toFixed(2)} x night (Base Rate for 1 Guest)</span>
              <span>${reservation.rooms.price.toFixed(2)}</span>
            </p>
            <p>
              <span>
                Additional Guests ({guests - 1} x ${Number(reservation.rooms.price / 2).toFixed(2)}per night)
              </span>
              <span>${guestsPrice}</span>
            </p>
            <p>
              <span>Total per Night: </span>
              <span>${totalPerNight}</span>
            </p>
          </div>

          <div>
            <span>Total Without Taxes ({totalNights} Nights)</span>
            <span>${totalPrice}</span>
          </div>
        </CardDescription>
      </Card>
    </div>
  );
}

export default CheckoutOverview;
