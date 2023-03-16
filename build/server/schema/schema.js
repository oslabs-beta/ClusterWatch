"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const schema = (0, graphql_1.buildSchema)(`
  type Query {
    key: String!
    uid(key: String!, dashboard: String!): String!
  }
`);
exports.schema = schema;
