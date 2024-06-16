import { DocumentNode } from 'graphql';

declare module '*.graphql' {
  const value: DocumentNode;
  export default value;
}
