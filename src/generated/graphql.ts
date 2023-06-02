import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/**
 * Type to describe a check, which are the things that projects should have implemented (testing,
 * automation, etc.)
 */
export type Check = {
  __typename?: 'Check';
  /** UUID */
  id: Scalars['ID']['output'];
  /** Descriptions of what a project is expected to have when they have a given level from 1-4 */
  levelDescriptions: Array<Scalars['String']['output']>;
  /** Name */
  name: Scalars['String']['output'];
};

/** Skill data to be used as the argument when calling the mutation createSkill */
export type CreateSkill = {
  /** Strings to be used for the 4 levels a skill can have */
  levelDescriptions: Array<Scalars['String']['input']>;
  /** Skill name */
  name: Scalars['String']['input'];
};

/** Skill data to be used as the argument when calling the mutation editSkill */
export type EditSkill = {
  /** UUID of the skill to edit */
  id: Scalars['ID']['input'];
  /** Edited descriptions of the 4 levels a skill can have */
  levelDescriptions?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Edited skill name */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Mutation to create a new skill */
  createSkill?: Maybe<Skill>;
  /** Mutation to delete an existing skill */
  deleteSkill?: Maybe<Skill>;
  /** Mutation to edit an existing skill */
  editSkill?: Maybe<Skill>;
};


export type MutationCreateSkillArgs = {
  newSkill: CreateSkill;
};


export type MutationDeleteSkillArgs = {
  id: Scalars['String']['input'];
};


export type MutationEditSkillArgs = {
  editedSkill: EditSkill;
};

/** Type to describe a project */
export type Project = {
  __typename?: 'Project';
  /** UUID */
  id: Scalars['ID']['output'];
  /** Names of the users that are working on this project */
  members: Array<Scalars['String']['output']>;
  /** Name */
  name: Scalars['String']['output'];
  /** Ratings that this project has received for different subjects (testing, automation, etc.) */
  reviews?: Maybe<Array<Review>>;
};

export type Query = {
  __typename?: 'Query';
  /** Query to get checks (filtered or not) */
  checks?: Maybe<Array<Check>>;
  /** Query to get projects (filtered or not) */
  projects?: Maybe<Array<Project>>;
  /** Query to get skills (filtered or not) */
  skills?: Maybe<Array<Skill>>;
  /** Query to get users (filtered or not) */
  users?: Maybe<Array<User>>;
};


export type QueryChecksArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProjectsArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySkillsArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUsersArgs = {
  filters?: InputMaybe<UsersFilters>;
};

/** Type to describe the values a project has for each of the checks that get reviewed */
export type Review = {
  __typename?: 'Review';
  /** Check that was reviewed */
  check: Check;
  /** The level (1-4) that the check has for the project */
  level?: Maybe<Scalars['Int']['output']>;
};

/** Type to describe a skill */
export type Skill = {
  __typename?: 'Skill';
  /** UUID */
  id: Scalars['ID']['output'];
  /** Descriptions of what a user is expected to know when they have a given level from 1-4 */
  levelDescriptions: Array<Scalars['String']['output']>;
  /** Name */
  name: Scalars['String']['output'];
};

/** Type to describe a user */
export type User = {
  __typename?: 'User';
  /** Full address */
  address?: Maybe<Scalars['String']['output']>;
  /** Birth date */
  birthDate: Scalars['String']['output'];
  /** Email */
  email?: Maybe<Scalars['String']['output']>;
  /** First name */
  firstName: Scalars['String']['output'];
  /** Full name */
  fullName: Scalars['String']['output'];
  /** UUID */
  id: Scalars['ID']['output'];
  /** Date when the user joined */
  joinedDate: Scalars['String']['output'];
  /** Last name */
  lastName: Scalars['String']['output'];
  /** Phone */
  phone?: Maybe<Scalars['String']['output']>;
  /** Name of the project in which this user is working */
  projectName?: Maybe<Scalars['String']['output']>;
  /** Role of the user within the company */
  role: Scalars['String']['output'];
  /** Skills that this user has */
  skills?: Maybe<Array<UserSkill>>;
};

/** Type to describe the skills a user has and the level it has for them */
export type UserSkill = {
  __typename?: 'UserSkill';
  /** The level (1-4) that the user has for the skill */
  level?: Maybe<Scalars['Int']['output']>;
  /** Skill that the user has */
  skill: Skill;
};

/** Available filters to be used as the argument when querying users */
export type UsersFilters = {
  /** Full user address */
  address?: InputMaybe<Scalars['String']['input']>;
  /** User email */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Full user name */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** User id */
  id?: InputMaybe<Scalars['String']['input']>;
  /** User phone */
  phone?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Check: ResolverTypeWrapper<Check>;
  CreateSkill: CreateSkill;
  EditSkill: EditSkill;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Project: ResolverTypeWrapper<Project>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  Skill: ResolverTypeWrapper<Skill>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserSkill: ResolverTypeWrapper<UserSkill>;
  UsersFilters: UsersFilters;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Check: Check;
  CreateSkill: CreateSkill;
  EditSkill: EditSkill;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Project: Project;
  Query: {};
  Review: Review;
  Skill: Skill;
  String: Scalars['String']['output'];
  User: User;
  UserSkill: UserSkill;
  UsersFilters: UsersFilters;
};

export type CheckResolvers<ContextType = any, ParentType extends ResolversParentTypes['Check'] = ResolversParentTypes['Check']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  levelDescriptions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createSkill?: Resolver<Maybe<ResolversTypes['Skill']>, ParentType, ContextType, RequireFields<MutationCreateSkillArgs, 'newSkill'>>;
  deleteSkill?: Resolver<Maybe<ResolversTypes['Skill']>, ParentType, ContextType, RequireFields<MutationDeleteSkillArgs, 'id'>>;
  editSkill?: Resolver<Maybe<ResolversTypes['Skill']>, ParentType, ContextType, RequireFields<MutationEditSkillArgs, 'editedSkill'>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  checks?: Resolver<Maybe<Array<ResolversTypes['Check']>>, ParentType, ContextType, Partial<QueryChecksArgs>>;
  projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType, Partial<QueryProjectsArgs>>;
  skills?: Resolver<Maybe<Array<ResolversTypes['Skill']>>, ParentType, ContextType, Partial<QuerySkillsArgs>>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, Partial<QueryUsersArgs>>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  check?: Resolver<ResolversTypes['Check'], ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillResolvers<ContextType = any, ParentType extends ResolversParentTypes['Skill'] = ResolversParentTypes['Skill']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  levelDescriptions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<ResolversTypes['UserSkill']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSkillResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSkill'] = ResolversParentTypes['UserSkill']> = {
  level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  skill?: Resolver<ResolversTypes['Skill'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Check?: CheckResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserSkill?: UserSkillResolvers<ContextType>;
};

