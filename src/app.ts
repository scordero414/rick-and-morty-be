import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import dotenv from 'dotenv';
import logRequestInfo from './middlewares/log-request-info';
dotenv.config();
const app = express();

app.all(
  '/api',
  createHandler({
    schema,
    rootValue: resolvers,
    onOperation(_, args, result) {
      logRequestInfo(args, result);
    },
  })
);

app.listen(process.env.GRAPH_PORT || 4000);
console.log('Running a GraphQL API server at http://localhost:4000/api');
