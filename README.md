# Apollo Server POC

## Introduction

This is a Proof of Concept with a sample project setup to use GQL with Apollo Server for the backend. It is meant to be complemented by the Apollo Client POC.

The main point of using GQL in our backend is to be able to return to clients only what they need. This document explains how the POC does that as well as some GQL concepts.

At the end of the document you can find the commands to run this project and how to use the Apollo Sandbox.

## Folder structure

These are the main points of the POC structure inside the `src` folder:
- `index.ts`: we instantiate and run our Apollo server. We pass the `typeDefs` (the schema) and `resolvers` (the implementation). When we start the server, we also pass a function to create the `context` that will be available to all our resolvers.
- `db`: contains the JSON files that simulate our DB structure.
- `graphql`: contains our schema and resolvers.
  - Folders: they contain the type definitions and resolvers following a feature-based structure for scalability.
    - `index.ts`: for exporting.
    - `mutations.ts`: for the resolvers of mutations.
    - `queries.ts`: for the resolvers of queries.
    - `resolvers.ts`: for the resolvers of fields that need specific behavior instead of using the default resolver. For example, the `skills` field of the type `User`.
    - `types.ts`: to declare the GQL types (including queries and mutations). This is the part that specifically uses the GQL language.
  - `index.ts`: exports the `typeDefs` and `resolvers` after structuring them for instantiating our Apollo server.
  - `codegen.ts`: config for the `codegen` script in the `package.json`.

## DB structure

For simplicity, the `db` folder contains some JSON files that would represent DB tables instead of creating and seeding a real DB. The four tables represented relate to one another as follows:

![DB Structure](assets/ApolloServerDB.png?raw=true "DB Structure")

The relationships between the tables are as follow:
- User Table:
  - Project: string containing the `id` of the project assigned to the user.
  - Skills: object where the keys are the `id` of an element in the Skill table and the values are the level that the user has for said skill.
- Project Table:
  - Members: array of strings containing multiple `id` of the users assigned to the project.
  - Review: object where the keys are the `id` of an element in the Check table and the values are the level that the project has achieved for said check.

Keep in mind that, while this POC uses JSON files, in reality we could have all sorts of data sources: DBs, responses from API REST services, data from other GQL services, etc.

## Client app needs

While the client itself is implemented in a separate repo, it's relevant here to understand why this POC implements the schema the way it does. We have a single client app for simplicity, but its three tabs represent three separate client "apps":
- For the Employees tab, we only need to see user data (name, address, etc.).
- For the Skill Matrix tab, it represents an app that needs to get users with their skills, and the level they have for each. It should also allow to create/edit/delete skills.
- For the Project Review Tool tab, it represents an app that needs to get projects with their reviews (which checks they have implemented and with what level).

We can notice our DB structure doesn't match perfectly and our schema will compensate for it.

## Schema structure

The schema defines the types (which include queries/mutations) available to be requested by a client, not how those things are implemented (which is done by the resolvers). It doesn't need to match the shape of our data sources. The point is that it should match what the clients need.

### Requirements

Based on the previous client needs, we need an schema that provides different data for the three different tabs:
- For the Employees tab, we need:
  - Basic user data (`name`, `address`, `phone`, `email`).
  - The `projectName` to which the user is assigned.
- For the Skill Matrix tab, we need:
  - `name` of the user.
  - `skills` of the user, that need to contain:
    - The skill itself (`name` and `levelDescriptions`).
    - The level the user has achieved for the skill.
- For the Project Review Tool tab, we need:
  - `name` of the project.
  - `reviews` of the project, that need to contain:
    - The check the project has implemented (`name` and `levelDescriptions`).
    - The level the project has achieved for the check.
  - `members` of the project, only needing the `name` of the users assigned to it.

We would also need to define queries to fetch the data and mutations related to the Skills (create, update, delete).

We could add more things, but when designing the schema it's better to only offer what is specifically needed. With GQL we can easily add types, fields, queries, mutations, etc. without breaking the existing code. But modifying/removing existing functionalities is more likely to break something, which is why it's best to stay minimalistic.

### Types

Based on the requirements, our object types are:
- `User` type, with the fields `id`, `name`, `address`, `phone`, `email`, `projectName` and `skills`.
  - `UserSkill` type, with the fields `skill` and `level`. This type is meant to be a middleman to contain both Skill data and the level the user has achieved for it. It lives in the `User` folder because it's only relevant as a type for a user field. We won't be querying or mutating anything with it.
- `Skill` type, with the fields `id`, `name`, `levelDescriptions`. This type has its own CRUD operations, but it's also used for the `UserSkill` type.
- `Project` type, with the fields `id`, `name`, `members`, `reviews`.
  - `Review` type, with the fields `check` and `level`. Same as with `UserSkill`, this type is only a middleman.
- `Check` type, with the fields `id`, `name`, `levelDescriptions`. This type has its own query, but it's also used for the `Review` type.

Some GQL notes regarding types:
- The types described above are known as [object types](https://www.apollographql.com/docs/apollo-server/schema/schema#object-types).
- The fields of those object types can be other object types (e.g. `skills: [UserSkill!]`) or [scalar types](https://www.apollographql.com/docs/apollo-server/schema/schema#scalar-types) (e.g. `String`, `ID!`).
  - The `ID` type is meant to be a unique value, and comes in handy for refreshing the cache when working with clients that also use Apollo.
  - The `!` sign after a type means that the field is not nullable. For example:
    - `name: String!` means the `name` field is required.
    - `skills: [UserSkill!]` means that the `skills` field is nullable but, if it contains an array, the content of said array has to be a `UserSkill`. It can contain an array with null values.
    - `skills: [UserSkill!]!` would mean that the `skills` field always needs to contain an array, even if it's an empty array.
- There are more types such as `union`, `interface` and `enum`, but those aren't used in this POC. Check them [here](https://www.apollographql.com/docs/apollo-server/schema/schema#supported-types).
- We can document our types (including queries/mutations) with `""` blocks. This is recommended so clients know what our schema offers (similar to Swagger). We can also apply [directives](https://www.apollographql.com/docs/apollo-server/schema/directives) in our schema for things like marking fields as deprecated, as well as custom behaviors.

### Queries

Based on the requirements, our queries are:
- `users` query, to get all/a subset of `User`s based on the `filters` received as an argument.
- `skills` query, to get all/a subset of `Skill`s based on the skill `name` received as an argument.
- `projects` query, to get all/a subset of `Project`s based on the project `name` received as an argument.
- `checks` query, to get all/a subset of `Check`s based on the check `name` received as an argument.

Queries are meant to only read and return data, not modifying it. You don't have to create queries for all your object types, only for those that need to be fetched by a client. For example, our client won't be calling a raw set of `Review`s; those will only come as part of a `Project`, so we have the `projects` query but not a `reviews` query.

From the point of view of GQL, the [Query type](https://www.apollographql.com/docs/apollo-server/schema/schema#the-query-type) is a special object type, and the queries that we declare (`users`, `skills`, etc.) are its fields. It's basically this:

```
type Query {
  users: [User!]
  skills: [Skill!]
  projects: [Project!]
  checks: [Check!]
}
```

But to have a scalable architecture, we're separating the different queries in the folder to which they relate. In the `graphql/index.ts` file we declare the `type Query` and in the separate `types.ts` files we do `extend type Query`.

### Mutations

Based on the requirements, our mutations are:
- `createSkill` mutation, to add a new `Skill` using the `newSkill` data received as an argument.
- `editSkill` mutation, to edit a `Skill` using the `editedSkill` data received as an argument.
- `deleteSkill` mutation, to delete a `Skill` using the skill `id` received as an argument.

Mutations are meant to modify data, and it is recommended to return the data that has been modified so clients can automatically updated without having to do a subsequent query to get the latest changes. You only need to have mutations based on the client needs, not for all object types.

Same as with queries, for GQL the [Mutation type](https://www.apollographql.com/docs/apollo-server/schema/schema#the-mutation-type) is a special object type. We're declaring it in `graphql/index.ts` and then extending it for scalability.

### Inputs

Some of our queries and mutations need to have hierarchical data in their arguments, so we have the following input types:
- `UsersFilters` input, for the filters of the `users` query.
- `CreateSkill` input, for the skill data needed to create one.
- `EditSkill` input, for the skill data needed to update one.

We only need input types when a scalar isn't enough. In this POC the examples are very simple so inputs seem a bit excessive but in more complex projects the can come in handy. For example, if we had a project where the user data has 20 required fields, we wouldn't want to have a `createUser` mutation with 20 separate arguments; instead, we'd have an input with those 20 fields and use it for the argument of the mutation.

In GQL we can't use regular object types as arguments (details [here](https://spec.graphql.org/June2018/#sec-Input-Objects)), we have to use input. It's recommended to avoid reusing input types for different arguments unless we're sure that the implementation won't drift apart.

## Resolvers

The resolvers define how our server will fetch (or modify) the data associated with a particular type. In our folder structure, the files that have the resolvers are:
- `mutations.ts`, which has the resolvers to modify data.
- `queries.ts`, which has the resolvers to fetch data.
- `resolvers.ts`, which has the resolvers of special fields that won't work with the default resolver.

The [default resolver](https://www.apollographql.com/docs/apollo-server/data/resolvers#default-resolvers) is how Apollo populates our data when we don't have anything specific defined by ourselves. Also, the resolvers only execute if the client has requested the associated field. For example, if we query `projects` and only request the field `name` and `members`:
- The resolver for the query `projects` in `queries.ts` will execute.
- The field `name` will be populated by the default resolver, which will pick the `name` field that is already present in our raw data from the JSON file.
- The resolver for the field `members` in `resolvers.ts` will execute instead of going for the default.
- The resolver for the field `reviews` in `resolvers.ts` won't execute because the field was not requested by the user, which saves us reading from another JSON (or DB table in a realistic scenario).

Structuring the schema and resolvers correctly is critical for efficiency. In this POC the queries only read the basic data that come from one JSON and only if the client requests certain fields, it reads from other JSON files.

### Resolver parameters

Every resolver receives four [parameters](https://www.apollographql.com/docs/apollo-server/data/resolvers#resolver-arguments):
- `parent`, which is basically the parent data coming from the previous step in the resolver chain.
  - For example, when a client calls the `users` query, the `parent` is just the `root` data available from Apollo in this first step of the chain.
  - If the client requested the field `skills`, that would execute the `skills` resolver in `resolvers.ts`. And the `parent` in that resolver would be the `User` that came from the result of the `users` query.
- `args`, which are the arguments received from the client request. For example, if the client wanted to query `skills` with a specific `name`, then the args will contain a property `name` with what the client requested.
- `contextValue`, which is the context shared by all resolvers. The context is instantiated for every request received from a client. It offers to our resolvers data such as the authenticated user, a DB connection, etc. Basically anything that might be needed to populate our schema's fields.
- `info`, which contains information about the operation's execution state, but it's not used in this POC.

### GQL and TS types

To maintain type safety, it's important to have a way of indicating what is expected from the resolver parameters. However, our GQL types can be used directly in TS. For this, we use the [GraphQL Code Generator](https://the-guild.dev/graphql/codegen), which reads our schema and generates TS based on it in the `generated` folder. From that generated file, we can import the necessary types in our TS code.

Basically, we start our server normally and then execute the `codegen` command which will use the config in `codegen.ts` to point to the running server and generate the TS types. It is also possible to configure the generator with a `.yml` instead, to do it against our code files without having to run the server, etc. But for simplicity, this POC has the basic behavior to showcase how to use TS types.

## GQL with Apollo vs. REST API

The strength of using GQL in our backend resides in that we have a very granular control of what gets fetched and returned. This comes in handy when we expect our backend to be called by different client apps with different needs.

Considering our POC, if we implemented it using a REST API we would have to choose between:
- Have fewer endpoints, but they calculate and return data that not all clients need. This means our endpoints would be slower than they should because they're fetching data unnecessarily.
- Have more endpoints so they're specific to what clients need. This means our service is harder to maintain.

Using GQL with Apollo and a good schema/resolver definition, we can reduce what gets fetched to only what is required by each separate client. However, it can add unnecessary complexity to your backend if you don't have a scenario that calls for so much granularity.

## Commands

To run the project, first install the packages:

```
yarn
```

And then start the server:

```
yarn start
```

The server will start running on http://localhost:4000/, where you'll see the Apollo Sandbox.

If you make any changes to the schema in any of the `types.ts` files, you can regenerate the TS types by executing:

```
yarn codegen
```

Keep in mind you need to have the server running on http://localhost:4000/.

## Apollo Sandbox

By default, Apollo includes a sandbox that can be used for calling our server. Here's a demo on how you can use it for executing a query and a mutation. The demo also includes how to pass parameters to them, how to request specific fields and how errors are returned. You can also write the queries manually in the UI.

![Apollo Sandbox GIF](assets/ApolloSandboxDemo.gif?raw=true "Apollo Sandbox GIF")

Or if you want to download the video:

![Apollo Sandbox Demo](assets/ApolloSandboxDemo.mov?raw=true "Apollo Sandbox Demo")