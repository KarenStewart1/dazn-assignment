const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");
const app = express();
const path = require("path");
const morgan = require("morgan");

const PORT = process.env.PORT || 4000;

app.use(morgan("combined"));

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

async function startApolloServer() {
  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({ schema });
  await server.start();

  server.applyMiddleware({
    app,
  });
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}
startApolloServer();
