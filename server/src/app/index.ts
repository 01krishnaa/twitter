import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";
import { User } from "./user";
import cors from "cors";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  const graphqlServer = new ApolloServer({
    typeDefs: `

        ${User.types}

        type Query {
            sayHello: String
            sayHelloBro(name: String!): String
            ${User.queries}
           }
  `,
    resolvers: {
      Query: {
        sayHello: () => `hello from gradasdadasphql`,
        sayHelloBro: (parent: any, { name }: { name: string }) =>
          `hello ${name} bro`,
        ...User.resolvers.queries,
      },
    },
  });
  await graphqlServer.start();

  app.use("/graphql", expressMiddleware(graphqlServer));
  return app;
}
