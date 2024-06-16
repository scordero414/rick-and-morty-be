import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import dotenv from 'dotenv';
dotenv.config();

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `)

// // The root provides a resolver function for each API endpoint
// var root = {
//   hello() {
//     return "Hello world!"
//   },
// }

const app = express();

// Create and use the GraphQL handler.
app.all(
  '/api',
  createHandler({
    schema,
    rootValue: {
      ...resolvers.Query,
      ...resolvers.Mutation,
    },
  })
);

// Start the server at port
app.listen(process.env.GRAPH_PORT || 4000);
console.log('Running a GraphQL API server at http://localhost:4000/api');
