import { PaginatedRoom, RoomPayload } from "@/core/domain/types/room.type";
import { API_ENDPOINTS, API_URL } from "@/shared/lib/config/api";

export interface RoomRepository {
  list(): Promise<PaginatedRoom>;
  get(id: string): Promise<RoomPayload>;
}

export class RoomRepositoryImpl implements RoomRepository {
  async list(): Promise<PaginatedRoom> {
    const endpoint = API_ENDPOINTS.rooms.list();

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }
  async get(id: string): Promise<RoomPayload> {
   const endpoint = API_ENDPOINTS.rooms.detail(id);

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }

      return response.json();
    } catch (error) {
      throw error;
    }

  }
}