import roomsData from "../../data/rooms.json";
import { getText } from "./utils";

export interface RoomData {
  id: string;
  name: string;
  color: string;
}

const colors: Record<string, string | undefined> = {
  "Red Track": "#cb3c33",
  "Green Track": "#389826",
  "Purple Track": "#9558B2",
};

const ALL_ROOMS = roomsData.map(
  (data): RoomData => {
    const name = getText(data.name);
    return {
      id: String(data.id),
      name,
      color: colors[name] || "#111111",
    };
  }
);

export function getRoom(id: string): RoomData | null {
  return ALL_ROOMS.find((r) => r.id === id) || null;
}

export function getRoomX(id: string): RoomData | null {
  const room = getRoom(id);
  if (!room) {
    throw new Error(`unknown room: ${id}`);
  }
  return room;
}

export function getRoomIdFromName(name: string): string | null {
  return ALL_ROOMS.find((room) => room.name === name)?.id || null;
}
