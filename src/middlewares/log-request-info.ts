import { ExecutionResult } from 'graphql';
import { OperationArgs } from 'graphql-http';

const logRequestInfo = (args: OperationArgs, result: ExecutionResult) => {
  console.log(` ------ Operation Details -------`);
  console.log(`Operation: ${args.operationName}`);
  console.log(`Variables: ${JSON.stringify(args.document.definitions)}`);
  console.log(
    `Errors: ${Boolean(result.errors) && JSON.stringify(result.errors)}`
  );
  console.log(`---------------------------------`);
};

export default logRequestInfo;
