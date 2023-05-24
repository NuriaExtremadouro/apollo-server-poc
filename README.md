# Apollo Server POC

## Introduction

This is a Proof of Concept with a sample project setup to use GQL with Apollo in a backend. It is meant to be complemented by the Apollo Client POC.

## Tutorial

Note: the section is not complete yet.

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

## DB structure

Note: the section is not complete yet.

For simplicity, the `db` folder contains some JSON files that would represent DB tables instead of creating and seeding a real DB. The four tables represented relate to one another as follows:

## Schema structure

Note: the section is not complete yet.

The idea of this Apollo server is to provide data to clients in the way they needed. This means that the types defined in our schema don't need to match exactly what we have in our DB (or any other datasources).

For example, the table mocked in `user-table.json` has a `project` field for each entry. But this field is the `id` of a project that matches in the `project-table.json`.

However, a client might want to get the User data with the *name* of the project it has assigned, not the Id. So our User type in the GQL reflects that. It contains some basic user data that matches the User DB table (`id`, `name`, etc,) and then the field `projectName`. This field in our GQL gets resolved in the `User -> resolvers.ts` file so it returns the Project name that matches the Project Id we have.

By creating a schema that matches what the clients need, they won't have to call twice to first get the User and then get the Project that matches the Id assigned to said user. But also, because it's resolved separately, the `projectName` will only be calculated if the client explicitly requests it.