import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import dotenv from 'dotenv';
import logRequestInfo from './middlewares/log-request-info';
import cors from 'cors';
dotenv.config();
const app = express();

app.use(cors());

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
