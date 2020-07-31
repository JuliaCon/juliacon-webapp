import { GraphQLResolveInfo } from "graphql";
import {
  PretalxAPITalk,
  PretalxAPISpeaker,
  PretalxAPIRoom,
  PretalxAPIPoster,
} from "../../pretalx";
import { ResolverContext } from "../ResolverContext";
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Poster = {
  readonly __typename?: "Poster";
  readonly id: Scalars["ID"];
  readonly title: Scalars["String"];
  readonly abstract: Scalars["String"];
  readonly description?: Maybe<Scalars["String"]>;
  readonly day: PosterDay;
  readonly pdflink?: Maybe<Scalars["String"]>;
  readonly speakers: ReadonlyArray<Speaker>;
};

export enum PosterDay {
  One = "One",
  Two = "Two",
}

export type Query = {
  readonly __typename?: "Query";
  readonly talk?: Maybe<Talk>;
  readonly talks: ReadonlyArray<Talk>;
  readonly room?: Maybe<Room>;
  readonly rooms: ReadonlyArray<Room>;
  readonly speaker?: Maybe<Speaker>;
  readonly poster?: Maybe<Poster>;
  readonly posters: ReadonlyArray<Poster>;
};

export type QueryTalkArgs = {
  id: Scalars["ID"];
};

export type QueryTalksArgs = {
  day?: Maybe<Scalars["String"]>;
  roomId?: Maybe<Scalars["ID"]>;
  talkType?: Maybe<TalkType>;
};

export type QueryRoomArgs = {
  id: Scalars["ID"];
};

export type QuerySpeakerArgs = {
  id: Scalars["ID"];
};

export type QueryPosterArgs = {
  id: Scalars["ID"];
};

export type QueryPostersArgs = {
  day?: Maybe<Scalars["String"]>;
};

export type Room = {
  readonly __typename?: "Room";
  readonly id: Scalars["ID"];
  readonly name: Scalars["String"];
  readonly description?: Maybe<Scalars["String"]>;
  readonly color?: Maybe<Scalars["String"]>;
  /**
   * The talks scheduled to occur in this room.
   *
   * ### Optional Arguments
   * * `day` - The conference day to fetch talks for.
   *     Must be in format `YYYY-MM-DD`.
   */
  readonly talks: ReadonlyArray<Talk>;
};

export type RoomTalksArgs = {
  day?: Maybe<Scalars["String"]>;
};

export type Speaker = {
  readonly __typename?: "Speaker";
  readonly id: Scalars["ID"];
  readonly name: Scalars["String"];
  readonly biography?: Maybe<Scalars["String"]>;
  /** The URL of the user's upload avatar image. */
  readonly avatar?: Maybe<Scalars["String"]>;
  readonly talks: ReadonlyArray<Talk>;
};

export type Talk = {
  readonly __typename?: "Talk";
  readonly id: Scalars["ID"];
  readonly title: Scalars["String"];
  readonly abstract?: Maybe<Scalars["String"]>;
  readonly description?: Maybe<Scalars["String"]>;
  readonly day: Scalars["String"];
  readonly type: TalkType;
  /** True if the talk is live (not pre-recorded). */
  readonly isLive?: Maybe<Scalars["Boolean"]>;
  /** The start time of the talk (as an ISO 8601 formatted timestamp). */
  readonly startTime: Scalars["String"];
  /** The end time of the talk (as an ISO 8601 formatted timestamp). */
  readonly endTime: Scalars["String"];
  readonly speakers: ReadonlyArray<Speaker>;
  readonly room: Room;
  /** The ID of the YouTube video associated with this talk (if any). */
  readonly videoCode?: Maybe<Scalars["String"]>;
  /**
   * The talk that is immediately after this talk (if any) in the same room as
   * the talk.
   *
   * If there is a gap before the next talk, this will be null.
   */
  readonly nextTalk?: Maybe<Talk>;
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Talk: ResolverTypeWrapper<PretalxAPITalk>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  TalkType: TalkType;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Speaker: ResolverTypeWrapper<PretalxAPISpeaker>;
  Room: ResolverTypeWrapper<PretalxAPIRoom>;
  Poster: ResolverTypeWrapper<PretalxAPIPoster>;
  PosterDay: PosterDay;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ID: Scalars["ID"];
  Talk: PretalxAPITalk;
  String: Scalars["String"];
  Boolean: Scalars["Boolean"];
  Speaker: PretalxAPISpeaker;
  Room: PretalxAPIRoom;
  Poster: PretalxAPIPoster;
};

export type PosterResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Poster"] = ResolversParentTypes["Poster"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  abstract?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  day?: Resolver<ResolversTypes["PosterDay"], ParentType, ContextType>;
  pdflink?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  speakers?: Resolver<
    ReadonlyArray<ResolversTypes["Speaker"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  talk?: Resolver<
    Maybe<ResolversTypes["Talk"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTalkArgs, "id">
  >;
  talks?: Resolver<
    ReadonlyArray<ResolversTypes["Talk"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTalksArgs, never>
  >;
  room?: Resolver<
    Maybe<ResolversTypes["Room"]>,
    ParentType,
    ContextType,
    RequireFields<QueryRoomArgs, "id">
  >;
  rooms?: Resolver<
    ReadonlyArray<ResolversTypes["Room"]>,
    ParentType,
    ContextType
  >;
  speaker?: Resolver<
    Maybe<ResolversTypes["Speaker"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySpeakerArgs, "id">
  >;
  poster?: Resolver<
    Maybe<ResolversTypes["Poster"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPosterArgs, "id">
  >;
  posters?: Resolver<
    ReadonlyArray<ResolversTypes["Poster"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPostersArgs, never>
  >;
};

export type RoomResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Room"] = ResolversParentTypes["Room"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  talks?: Resolver<
    ReadonlyArray<ResolversTypes["Talk"]>,
    ParentType,
    ContextType,
    RequireFields<RoomTalksArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SpeakerResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Speaker"] = ResolversParentTypes["Speaker"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  biography?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  avatar?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  talks?: Resolver<
    ReadonlyArray<ResolversTypes["Talk"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type TalkResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Talk"] = ResolversParentTypes["Talk"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  abstract?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  day?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["TalkType"], ParentType, ContextType>;
  isLive?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  speakers?: Resolver<
    ReadonlyArray<ResolversTypes["Speaker"]>,
    ParentType,
    ContextType
  >;
  room?: Resolver<ResolversTypes["Room"], ParentType, ContextType>;
  videoCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  nextTalk?: Resolver<Maybe<ResolversTypes["Talk"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = ResolverContext> = {
  Poster?: PosterResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  Speaker?: SpeakerResolvers<ContextType>;
  Talk?: TalkResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
