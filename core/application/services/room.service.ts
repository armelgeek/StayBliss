import { PaginatedRoom, RoomPayload } from "@/core/domain/types/room.type";
import { RoomRepository, RoomRepositoryImpl } from "../repository/room.repository";

export interface RoomService {
  list(): Promise<PaginatedRoom>;
  detail(id: string): Promise<RoomPayload>;
}

export class RoomServiceImpl implements RoomService {
  private readonly roomRepository: RoomRepository;

  constructor(
    roomRepository: RoomRepository = new RoomRepositoryImpl()
  ) {
    this.roomRepository = roomRepository;
  }

  async list(): Promise<PaginatedRoom> {
    return await this.roomRepository.list();
  }

  async detail(id: string): Promise<RoomPayload> {
    return await this.roomRepository.get(id);
  }
}
