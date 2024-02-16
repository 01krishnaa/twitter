import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";


export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  const graphqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            sayHello: String
            sayHelloBro(name: String!): String!
        }
  `,
    resolvers: {
      Query: {
        sayHello: () => `hello from graphql`,
        sayHelloBro: (parent: any, { name }: { name: string }) =>
          `hello ${name} bro`,
      },
    },
  });
  await graphqlServer.start();

  app.use("/graphql", expressMiddleware(graphqlServer));
  return app;
}
