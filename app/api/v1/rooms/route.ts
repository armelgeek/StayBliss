import { getAllRooms } from "@/core/application/use-cases/room/get-rooms.use-case";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getAllRooms();

  return NextResponse.json(data);
}