export function nightTotalPrice(pricePerNight: number, guests: number, guestsDiscount = 50): number {
  const guest_price_with_discount = pricePerNight * (guestsDiscount / 100);
  const total = pricePerNight + guest_price_with_discount * (guests - 1);

  return Number(total.toFixed(2));
}

export function bookingTotalPrice(pricePerNight: number, guests: number, nightsCount: number, guestsDiscount = 50): number {
  const total = nightTotalPrice(pricePerNight, guests, guestsDiscount) * nightsCount;

  return Number(total.toFixed(2));
}
