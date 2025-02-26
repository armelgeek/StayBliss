import { formatISO9075, isValid } from "date-fns";
import { db } from "@/drizzle/db";
import { reservations } from "@/drizzle/schema/reservations";
import { and, eq, isNull, sql } from "drizzle-orm";
import { rooms } from "@/drizzle/schema/rooms";

interface ReservationInput {
  room_id: string;
  guest_id: string;
  guests_count: number;
  message?: string;
  reserved_price: number;
  start_date: string | Date;
  end_date: string | Date;
  stripe_session_id?: string;
  status: string;
}
export async function getRoomReservations(id: string) {
  const res = await db.select().from(reservations).where(eq(reservations.room_id, id));
  console.log('ici leka', res);
  return res;
}


export async function getGuestReservations(guest_id: string) {
  const res = await db
    .select({
      id: reservations.id,
      room_id: reservations.room_id,
      guest_id: reservations.guest_id,
      start_date: reservations.start_date,
      end_date: reservations.end_date,
      status: reservations.status,
      reserved_price: reservations.reserved_price,
      guests_count: reservations.guests_count,
      rooms: {
        thumbnail: rooms.thumbnail,
        name: rooms.name,
        capacity: rooms.capacity,
      },
    })
    .from(reservations)
    .leftJoin(rooms, eq(reservations.room_id, rooms.id))
    .where(
      and(
        eq(reservations.guest_id, guest_id),
        isNull(reservations.deleted_at)
      )
    );

  return res;
}

export async function createNewReservation(reservationObj: ReservationInput) {
  try {
    const {
      room_id,
      guest_id,
      guests_count,
      //message,
      reserved_price,
      start_date,
      end_date,
      //stripe_session_id,
      status,
    } = reservationObj;

    // Vérification et conversion des dates
    const parsedStartDate = new Date(start_date);
    const parsedEndDate = new Date(end_date);

    if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
      throw new Error("Les dates de réservation sont invalides.");
    }

    const formattedStartDate = formatISO9075(parsedStartDate);
    const formattedEndDate = formatISO9075(parsedEndDate);

    // Insertion avec conversion de `reserved_price` en string
    const [reservation] = await db
      .insert(reservations)
      .values({
        room_id,
        guest_id,
        guests_count,
        reserved_price: reserved_price.toFixed(2),
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        status,
        deleted_at: null,
        //stripe_session_id: stripe_session_id ?? null,
      })
      .returning({ id: reservations.id });

    if (!reservation) {
      throw new Error("L'insertion de la réservation a échoué.");
    }

    return reservation;
  } catch (error) {
    console.error("Erreur lors de la création de la réservation :", error);
    throw new Error("Impossible de créer la réservation. Veuillez réessayer.");
  }
}

export async function deleteReservation(id: string) {
  try {
    const [reservation] = await db
      .update(reservations)
      .set({ deleted_at: formatISO9075(new Date()) })
      .where(eq(reservations.id, id))
      .returning();

    if (!reservation) {
      throw new Error("Réservation non trouvée.");
    }

    return reservation;
  } catch (error) {
    console.error("Erreur lors de la suppression de la réservation :", error);
    throw new Error("Impossible de supprimer la réservation.");
  }
}
type ReservationPayload = {
  id: string;
  room_id: string;
  guest_id: string;
  start_date: string;
  end_date: string;
  status: string;
  reserved_price: string;
  guests_count: number;
  rooms: {
    thumbnail: string | null;
    name: string;
    capacity: number;
    price: number;
  };
  guests?: {
    first_name: string;
    last_name: string;
  };
}
export async function getReservationByID(id: string) {
  const result = await db
    .select()
    .from(reservations)
    .where(eq(reservations.id, id))
    .leftJoin(rooms, eq(reservations.room_id, rooms.id));

  return result[0] || null;
}
export async function updateReservation(id: string, price: number, guests_count: number, start_date: string | Date, end_date: string | Date) {
  try {
    const parsedStartDate = new Date(start_date);
    const parsedEndDate = new Date(end_date);

    if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
      throw new Error("Les dates fournies sont invalides.");
    }

    const [reservation] = await db
      .update(reservations)
      .set({
        reserved_price: price.toFixed(2),
        guests_count,
        start_date: formatISO9075(parsedStartDate),
        end_date: formatISO9075(parsedEndDate),
      })
      .where(eq(reservations.id, id))
      .returning(); 

    if (!reservation) {
      throw new Error("Réservation non trouvée ou mise à jour échouée.");
    }

    return reservation;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la réservation :", error);
    throw new Error("Impossible de mettre à jour la réservation. Veuillez réessayer.");
  }
}


export async function cancelReservation(id: string) {
  try {
    const [reservation] = await db
      .update(reservations) 
      .set({ status: "cancelled" })
      .where(eq(reservations.id, id))
      .returning();

    if (!reservation) {
      throw new Error("Réservation non trouvée ou échec de la mise à jour.");
    }

    return reservation; 
  } catch (error) {
    console.error("Erreur lors de l'annulation de la réservation :", error);
    throw new Error("Impossible d'annuler la réservation. Veuillez réessayer.");
  }
}

export async function getReservationByStripeSessionId(session_id: string) {
  try {
    const reservation = await db
      .select({
        id: reservations.id,
        room_id: reservations.room_id,
        guest_id: reservations.guest_id,
        start_date: reservations.start_date,
        end_date: reservations.end_date,
        status: reservations.status,
        reserved_price: reservations.reserved_price,
        guests_count: reservations.guests_count,
        rooms: {
          thumbnail: rooms.thumbnail,
          name: rooms.name,
          capacity: rooms.capacity,
          price: rooms.price,
        },
      })
      .from(reservations)
      .leftJoin(rooms, eq(reservations.room_id, rooms.id))
      .where(eq(reservations.stripe_session_id, session_id))
      .limit(1)
      .then(res => res[0]);

    if (!reservation) {
      throw new Error("Réservation non trouvée.");
    }

    return reservation; 
  } catch (error) {
    console.error("Erreur lors de la récupération de la réservation :", error);
    throw new Error("Impossible de récupérer la réservation. Veuillez réessayer.");
  }
}