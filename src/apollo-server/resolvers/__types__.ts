import { GraphQLResolveInfo } from "graphql";
import {
  PretalxAPITalk,
  PretalxAPISpeaker,
  PretalxAPIRoom,
} from "../../pretalx";
import { ResolverContext } from "../ResolverContext";
export type Maybe<T> = T | null | undefined;
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

export type Query = {
  readonly __typename?: "Query";
  readonly talk?: Maybe<Talk>;
  readonly talks: ReadonlyArray<Talk>;
  readonly room?: Maybe<Room>;
  readonly rooms: ReadonlyArray<Room>;
};

export type QueryTalkArgs = {
  id: Scalars["ID"];
};

export type QueryRoomArgs = {
  id: Scalars["ID"];
};

export type Room = {
  readonly __typename?: "Room";
  readonly id: Scalars["ID"];
  readonly name: Scalars["String"];
  readonly description?: Maybe<Scalars["String"]>;
  readonly talks: ReadonlyArray<Talk>;
};

export type Speaker = {
  readonly __typename?: "Speaker";
  readonly id: Scalars["ID"];
  readonly name: Scalars["String"];
  readonly biography?: Maybe<Scalars["String"]>;
  /** The URL of the user's upload avatar image. */
  readonly avatar?: Maybe<Scalars["String"]>;
};

export type Talk = {
  readonly __typename?: "Talk";
  readonly id: Scalars["ID"];
  readonly title: Scalars["String"];
  readonly abstract?: Maybe<Scalars["String"]>;
  readonly description?: Maybe<Scalars["String"]>;
  readonly speakers: ReadonlyArray<Speaker>;
  readonly room?: Maybe<Room>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

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

export type isTypeOfResolverFn<T = {}> = (
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
  Speaker: ResolverTypeWrapper<PretalxAPISpeaker>;
  Room: ResolverTypeWrapper<PretalxAPIRoom>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ID: Scalars["ID"];
  Talk: PretalxAPITalk;
  String: Scalars["String"];
  Speaker: PretalxAPISpeaker;
  Room: PretalxAPIRoom;
  Boolean: Scalars["Boolean"];
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
    ContextType
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
  talks?: Resolver<
    ReadonlyArray<ResolversTypes["Talk"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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
  speakers?: Resolver<
    ReadonlyArray<ResolversTypes["Speaker"]>,
    ParentType,
    ContextType
  >;
  room?: Resolver<Maybe<ResolversTypes["Room"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = ResolverContext> = {
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
