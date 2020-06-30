export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  talk?: Maybe<Talk>;
  talks: Array<Talk>;
  room?: Maybe<Room>;
  rooms: Array<Room>;
  speaker?: Maybe<Speaker>;
};

export type QueryTalkArgs = {
  id: Scalars["ID"];
};

export type QueryTalksArgs = {
  day?: Maybe<Scalars["String"]>;
  roomId?: Maybe<Scalars["ID"]>;
  talkType?: Maybe<TalkType>;
  speakerId?: Maybe<Scalars["ID"]>;
};

export type QueryRoomArgs = {
  id: Scalars["ID"];
};

export type QuerySpeakerArgs = {
  id: Scalars["ID"];
};

export type Room = {
  __typename?: "Room";
  id: Scalars["ID"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  /**
   * The talks scheduled to occur in this room.
   *
   * ### Optional Arguments
   * * `day` - The conference day to fetch talks for.
   *     Must be in format `YYYY-MM-DD`.
   */
  talks: Array<Talk>;
};

export type RoomTalksArgs = {
  day?: Maybe<Scalars["String"]>;
};

export type Speaker = {
  __typename?: "Speaker";
  id: Scalars["ID"];
  name: Scalars["String"];
  biography?: Maybe<Scalars["String"]>;
  /** The URL of the user's upload avatar image. */
  avatar?: Maybe<Scalars["String"]>;
};

export type Talk = {
  __typename?: "Talk";
  id: Scalars["ID"];
  title: Scalars["String"];
  abstract?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  day: Scalars["String"];
  type: TalkType;
  /** The start time of the talk (as an ISO 8601 formatted timestamp). */
  startTime: Scalars["String"];
  /** The end time of the talk (as an ISO 8601 formatted timestamp). */
  endTime: Scalars["String"];
  speakers: Array<Speaker>;
  room?: Maybe<Room>;
};

export enum TalkType {
  BirdsOfFeather = "BIRDS_OF_FEATHER",
  Break = "BREAK",
  Keynote = "KEYNOTE",
  LightningTalk = "LIGHTNING_TALK",
  Minisymposium = "MINISYMPOSIUM",
  SponsorAddress = "SPONSOR_ADDRESS",
  Talk = "TALK",
  WorkshopFullDay = "WORKSHOP_FULL_DAY",
  WorkshopHalfDay = "WORKSHOP_HALF_DAY",
}
