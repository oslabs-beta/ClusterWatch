import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    key: String!
    uid(key: String!, dashboard: String!): String!
  }
`);

export { schema };