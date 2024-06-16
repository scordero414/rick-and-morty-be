import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello() {
    return 'Hello world!';
  },
};

const app = express();

// Create and use the GraphQL handler.
app.all(
  '/api',
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Start the server at port
app.listen(process.env.GRAPH_PORT || 4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
