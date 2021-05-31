const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const { RecipeModel, UserModel } = require("./models");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config({
  path: "variables.env",
});

const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (_) => ({
      RecipeModel,
      UserModel,
    }),
  });

  await server.start();

  const PORT = process.env.PORT || 4000;
  const app = new express();

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(server.graphqlPath);
  });

  return {
    server,
    app,
  };
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  await startApolloServer();
  await connectDB();
};

main();
