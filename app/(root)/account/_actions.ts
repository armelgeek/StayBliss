"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { auth } from '@/auth';
import { cancelReservation, getReservationByID, getRoomReservations, updateReservation } from "@/core/application/use-cases/reservation/reservation.use-case";
import { bookingTotalPrice } from "@/shared/utils/reservationsCalcs";
import { daysDifferCount } from "@/shared/utils/datetime";
import { areIntervalsOverlapping, Interval, isBefore, isValid } from "date-fns";
import { NextApiResponse } from 'next';

interface UpdateUserResponse {
  success?: boolean;
  error?: string;
}

export async function updateName(data: FormData): Promise<UpdateUserResponse | void> {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  try {
    const value = data.get("value") as string;
    if (!value || value === session?.user.name) return;
    await auth.api.updateUser({ headers: h, body: { name: value } });
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error updating name:", error);
  }
}

export async function updateAvatar(path: string): Promise<void> {
  const h = await headers();
  try {
    await auth.api.updateUser({ headers: h, body: { image: path } });
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error updating avatar:", error);
  }
}

export async function updateUsername(data: FormData): Promise<UpdateUserResponse | void> {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  try {
    const value = data.get("value") as string;
    if (!value || value === session?.user.username) return;
    await auth.api.updateUser({ headers: h, body: { username: value } });
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error updating username:", error);
  }
}

export async function updateEmail(data: FormData): Promise<UpdateUserResponse | void> {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  try {
    const value = data.get("value") as string;
    if (!value || value === session?.user.email) return;
    await auth.api.changeEmail({ headers: h, body: { newEmail: value } });
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error updating email:", error);
  }
}

export async function updatePassword(data: FormData): Promise<void> {
  const h = await headers();
  try {
    const currentPassword = data.get("currentPassword") as string;
    const newPassword = data.get("newPassword") as string;
    await auth.api.changePassword({
      headers: h,
      body: { newPassword, currentPassword },
    });
  } catch (error) {
    console.error("Error updating password:", error);
  }
}

export async function deleteAccount(data: FormData): Promise<void> {
  const h = await headers();
  try {
    const password = data.get("value") as string;
    await auth.api.deleteUser({ headers: h, body: { password } });
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error deleting account:", error);
  }
}

export async function bookingCancelAction(res: NextApiResponse): Promise<void> {
  const cookiesStore = await cookies();
  if (cookiesStore.has("pending_reservation")) {
    await cookiesStore.delete("pending_reservation");
    res.redirect("/rooms");
  }
}

export async function reservationUpdateAction(prevState: { status?: string; error?: string }, formData: FormData): Promise<{ status?: string; error?: string }> {
  prevState = { ...prevState };

  const start_date = new Date(formData.get("start_date") as string);
  const end_date = new Date(formData.get("end_date") as string);
  const guests_count = parseInt(formData.get("guests") as string) as unknown as number;
  const reservation_id = formData.get("reservation_id") as string;

  if (!(isValid(start_date) && isValid(end_date)))
    return { ...prevState, error: "Invalid date, please choose a range from the calendar" };
  if (isBefore(end_date, start_date))
    return { ...prevState, error: "Invalid date, please choose a valid range from the calendar" };

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user)
    return { ...prevState, error: "Unauthorized to perform this action, please sign in and try again" };

  const target_reservation = await getReservationByID(reservation_id) ;

  if (!target_reservation)
    return {
      ...prevState,
      error: "Error, you are attempting to update a non-existent reservation. Please access through your reservation history!",
    };

  const planned_room_reservations = await getRoomReservations(target_reservation.room_id);
  const room_busy_days = planned_room_reservations.filter((item) =>
    item.id !== reservation_id ? {
      start: new Date(item.start_date),
      end: new Date(item.end_date),
    } : false
  );

  if (room_busy_days.find((item) => areIntervalsOverlapping(item as unknown as Interval, { start: start_date, end: end_date }))) {
    return {
      ...prevState,
      error: "Invalid date! The selected range already has a booking, please adjust your booking range",
    };
  }

  if (target_reservation.guest_id !== session.user.id)
    return { ...prevState, error: "Unauthorized to perform this action!" };

  if (guests_count < 1 || guests_count > target_reservation.rooms.capacity)
    return { ...prevState, error: "Invalid guests number! Please choose a number from the dropdown area" };

  const totalNights = daysDifferCount(end_date, start_date);
  const new_total = bookingTotalPrice(target_reservation.rooms.price, guests_count, totalNights);
  await updateReservation(reservation_id, new_total, guests_count, start_date.toISOString(), end_date.toISOString());

  revalidatePath(`/reservations/edit/${reservation_id}`);
  return { status: "success" };
}

export async function reservationCancelAction(prevState: { error?: string, status?: string }, formData: FormData) {
  const reservation_id = formData.get("reservation_id") as string;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { ...prevState, error: "Unauthorized to perform this action!" };

  await cancelReservation(reservation_id);

  revalidatePath("/account/history");
}
