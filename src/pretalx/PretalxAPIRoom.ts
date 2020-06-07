import roomsData from "../../data/rooms.json";

export type PretalxAPIRoom = typeof ALL_ROOMS[number];

export const ALL_ROOMS = roomsData.map((data) => ({
  id: String(data.id),
  name: data.name["en"],
}));

export function getRoomIdFromName(name: string) {
  return ALL_ROOMS.find((room) => room.name === name)?.id;
}
